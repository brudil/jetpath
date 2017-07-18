import PropTypes from 'prop-types';
import React from 'react';
import without from 'lodash/without';
import TagsInput from 'react-tagsinput';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { TitleSelection, SelectionItem } from '../components/TitleSelection';
import UsersPicker from '../components/UserPicker';
import MediaGrid from '../components/MediaGrid';
import MediaUploadContainer from '../components/MediaUploadContainer';
import MediaEditModal from '../components/MediaEditModal';
import * as MediaListActions from '../actions/MediaListActions';
import * as MediaActions from '../actions/MediaActions';
import * as ModalManagerActions from '../actions/ModalManagerActions';
import ViewContainer from '../components/ViewContainer';
import DocumentTitle from '../components/DocumentTitle';
import SegmentedControl from '../components/SegmentedControl';
import PaginationNav from '../components/PaginationNav';
import LoadingContent from '../components/LoadingContent';
import NoListItems from '../components/NoListItems';
import Sidebar, { SidebarControl } from '../components/Sidebar';

import viewContainerStyles from '../styles/components/ViewContainer.css';
import stylesStandardHeader from '../styles/components/StandardHeader.css';
import { withRouter } from 'react-router-dom';

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
    const query = this.props.location.query;
    return {
      order: query.order || 'created_desc',
      type: query.type || null,
      uploaders: query.uploaders || [],
      tags: query.tags || [],
      page: parseInt(query.page, 10) || 1,
    };
  }

  handleQueryChange(filters) {
    const vertical = this.props.match.params.vertical;
    this.props.dispatch(
      replace({
        pathname: `/@${vertical}/media`,
        query: filters,
      })
    );
    this.props.dispatch(
      MediaListActions.loadMediaList(this.props.match.params.vertical, { ...filters })
    );
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
    this.props.dispatch(MediaActions.upload.request(file));
  }

  handlePagination(page) {
    this.handleQueryChange({ ...this.getQueryData(), page });
  }

  renderContent(query) {
    const { hasNext, isLoading, mediaItems } = this.props;

    if (isLoading) {
      return <LoadingContent />;
    }

    if (mediaItems.length > 0) {
      return (
        <div>
          <MediaGrid
            media={this.props.mediaItems}
            onSelect={this.handleItemSelect}
          />
          <PaginationNav
            hasNext={hasNext}
            currentPage={query.page}
            onChange={this.handlePagination}
          />
        </div>
      );
    }

    return <NoListItems text="No media meets criteria" />;
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
            >
              <SelectionItem default="true" name="all">
                All Media
              </SelectionItem>
              <SelectionItem name="images">Images</SelectionItem>
              <SelectionItem name="videos">Videos</SelectionItem>
            </TitleSelection>
          </header>
          <div className={viewContainerStyles.root}>
            <div className={viewContainerStyles.content}>
              <MediaUploadContainer onFile={this.handleFile}>
                <div>
                  {this.renderContent(query)}
                </div>
              </MediaUploadContainer>
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

export default withRouter(
  connect(state => ({
    media: state.mediaList,
    mediamodal: state.mediamodal,
    uploadProgress: state.uploadProgress,
    mediaItems: state.mediaList.list.map(id => state.entities.media[id]),
    hasNext: state.mediaList.hasNext,
    isLoading: state.mediaList.loading,
  }))(MediaListPage)
);
