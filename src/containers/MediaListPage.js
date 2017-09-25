import PropTypes from 'prop-types';
import React from 'react';
import qs from 'query-string';
import without from 'lodash/without';
import TagsInput from 'react-tagsinput';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import { TitleSelection, SelectionItem } from '../components/TitleSelection';
import UsersPicker from '../components/UserPicker';
import MediaGridContainer from '../components/MediaGridContainer';
import MediaEditModal from '../components/MediaEditModal';
import * as MediaListActions from '../ducks/MediaList';
import * as ModalManagerActions from '../ducks/Modal';
import ViewContainer from '../components/ViewContainer';
import DocumentTitle from '../components/DocumentTitle';
import SegmentedControl from '../components/SegmentedControl';
import Sidebar, { SidebarControl } from '../components/Sidebar';

import viewContainerStyles from '../styles/components/ViewContainer.css';
import stylesStandardHeader from '../styles/components/StandardHeader.css';
import filterPresetsMatch from '../libs/filterPresetsMatch';

const presets = {
  all: {
    order: 'created_desc',
  },
  images: {
    type: 'image',
    order: 'created_desc',
  },
  videos: {
    type: 'video',
    order: 'created_desc',
  },
};

class MediaListPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleItemSelect = this.handleItemSelect.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.handleFilterPresetChange = this.handleFilterPresetChange.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  componentDidMount() {
    const data = this.getQueryData();
    this.handleQueryChange(data);
  }

  getQueryData() {
    const query = qs.parse(this.props.location.search);
    return {
      order: query.order || 'created_desc',
      type: query.type || null,
      uploaders: query.uploaders || [],
      tags: query.tags || [],
      page: parseInt(query.page, 10) || 1,
    };
  }

  handleQueryChange(filters) {
    console.log(this.props);
    const vertical = this.props.vertical.identifier;
    this.props.history.replace(`/@${vertical}/media?${qs.stringify(filters)}`);
  }

  handleUpdate(key, value) {
    const query = this.getQueryData();
    query[key] = value;
    this.handleQueryChange(query);
  }

  handleFilterPresetChange(key) {
    this.handleQueryChange(presets[key]);
  }

  handleUserFilter(method, userId) {
    const add = method === 'add';
    const query = this.getQueryData();
    if (add) {
      query.uploaders.push(userId);
    } else {
      query.uploaders = without(query.uploaders, userId);
    }

    this.handleQueryChange(query);
  }

  handleItemSelect(id) {
    this.props.dispatch(ModalManagerActions.open(this._mediaEditModal, { id }));
  }

  handleFile(file) {
    this.props.dispatch(MediaListActions.upload.request(file));
  }

  handlePagination(page) {
    this.handleQueryChange({ ...this.getQueryData(), page });
  }

  render() {
    const query = this.getQueryData();

    return (
      <DocumentTitle title="Media">
        <ViewContainer>
          <header className={stylesStandardHeader.root}>
            <a className={stylesStandardHeader.prepend}>
              <i className="icon icon-plus">
                <img
                  // eslint-disable-next-line
                  src={require('icons/plus.svg')}
                  alt="Add media"
                />
              </i>
            </a>
            <TitleSelection
              onSelection={this.handleFilterPresetChange}
              className={stylesStandardHeader.title}
              value={filterPresetsMatch(query, presets, 'custom')}
            >
              <SelectionItem name="all">All Media</SelectionItem>
              <SelectionItem name="images">Images</SelectionItem>
              <SelectionItem name="videos">Videos</SelectionItem>
              <SelectionItem name="custom">Filtered</SelectionItem>
            </TitleSelection>
          </header>
          <div className={viewContainerStyles.root}>
            <div className={viewContainerStyles.content}>
              <MediaGridContainer
                wrap={(media, children) => (
                  <Link
                    to={`${this.props.match &&
                      this.props.match.url}/${media.mediaId}`}
                  >
                    {children}
                  </Link>
                )}
              />
            </div>
            <div className={viewContainerStyles.sidebar}>
              <Sidebar>
                <SidebarControl title="Tags">
                  <TagsInput
                    value={query.tags}
                    onChange={this.handleUpdate.bind(this, 'tags')}
                  />
                </SidebarControl>

                <SidebarControl title="Uploader">
                  <UsersPicker
                    users={query.uploaders}
                    onAdd={this.handleUserFilter.bind(this, 'add')}
                    onRemove={this.handleUserFilter.bind(this, 'remove')}
                    noUsersText={''}
                    placeholderText="Search for users or me"
                  />
                </SidebarControl>

                <SidebarControl title="File type">
                  <SegmentedControl
                    value={query.type}
                    options={[
                      null,
                      'All',
                      'image',
                      'Images',
                      'video',
                      'Videos',
                    ]}
                    onChange={this.handleUpdate.bind(this, 'type')}
                  />
                </SidebarControl>

                <SidebarControl className="Order">
                  <SegmentedControl
                    value={query.order}
                    options={[
                      'created_desc',
                      'Recent',
                      'created_asc',
                      'Oldest',
                    ]}
                    onChange={this.handleUpdate.bind(this, 'order')}
                  />
                </SidebarControl>
              </Sidebar>
            </div>
          </div>

          <MediaEditModal
            ref={el => {
              this._mediaEditModal = el;
            }}
          />
        </ViewContainer>
      </DocumentTitle>
    );
  }
}

MediaListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  media: PropTypes.object.isRequired,
  mediamodal: PropTypes.object.isRequired,
  mediaItems: PropTypes.array.isRequired,
  uploadProgress: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  hasNext: PropTypes.bool.isRequired,
};

export default compose(
  withRouter,
  connect(state => ({
    mediamodal: state.mediamodal,
    uploadProgress: state.uploadProgress,
    vertical: state.verticals.selectedVertical,
  }))
)(MediaListPage);
