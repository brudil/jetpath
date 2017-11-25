import React from 'react';
import qs from 'query-string';
import without from 'lodash/without';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { TitleSelection, SelectionItem } from '../components/TitleSelection';
import MediaGridContainer from '../components/MediaGridContainer';
import * as MediaListActions from '../ducks/MediaList';
import ViewContainer from '../components/ViewContainer';
import SegmentedControl from '../components/SegmentedControl';
import Sidebar, { SidebarControl } from '../components/Sidebar';

import viewContainerStyles from '../styles/components/ViewContainer.css';
import stylesStandardHeader from '../styles/components/StandardHeader.css';
import filterPresetsMatch from '../libs/filterPresetsMatch';
import { RootState } from '../types';
import { RouteComponentProps } from 'react-router';
import { Vertical } from '../ducks/Vertical';
import Helmet from 'react-helmet';

import PlusIcon from 'icons/plus.svg';

interface Filter {
  order: 'created_asc' | 'created_desc';
  type: string | null;
  uploaders: number[];
  tags: string[];
  page: number;
}

type FilterKeys = 'order' | 'type' | 'uploaders' | 'tags' | 'page';

interface Presets {
  [key: string]: Partial<Filter>;
}

const presets: Presets = {
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

interface RouteProps {}

interface IProps extends RouteComponentProps<RouteProps> {
  media: any; // todo
  mediaItems: any; // todo
  uploadProgress: any; // todo
  isLoading: boolean;
  hasNext: boolean;
  vertical: Vertical;

  uploadRequest: typeof MediaListActions.upload.request;
}

class MediaListPage extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.handlePagination = this.handlePagination.bind(this);
    this.handleFilterPresetChange = this.handleFilterPresetChange.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  componentDidMount() {
    const data = this.getQueryData();
    this.handleQueryChange(data);
  }

  getQueryData(): Filter {
    const query = qs.parse(this.props.location.search);
    return {
      order: query.order || 'created_desc',
      type: query.type || null,
      uploaders: query.uploaders || [],
      tags: query.tags || [],
      page: parseInt(query.page, 10) || 1,
    };
  }

  handleQueryChange(filters: Partial<Filter>) {
    console.log(this.props);
    const vertical = this.props.vertical.identifier;
    this.props.history.replace(`/@${vertical}/media?${qs.stringify(filters)}`);
  }

  handleUpdate(key: FilterKeys, value: string) {
    const query = this.getQueryData();
    query[key] = value;
    this.handleQueryChange(query);
  }

  handleFilterPresetChange(key: string) {
    this.handleQueryChange(presets[key]);
  }

  handleUserFilter(method: string, userId: number) {
    // todo
    const add = method === 'add';
    const query = this.getQueryData();
    if (add) {
      query.uploaders.push(userId);
    } else {
      query.uploaders = without(query.uploaders, userId);
    }

    this.handleQueryChange(query);
  }

  handleFile(file: any) {
    // todo
    this.props.uploadRequest(file);
  }

  handlePagination(page: number) {
    this.handleQueryChange({ ...this.getQueryData(), page });
  }

  render() {
    const query = this.getQueryData();

    return (
      <ViewContainer>
        <Helmet>
          <title>Media</title>
        </Helmet>

        <header className={stylesStandardHeader.root}>
          <a className={stylesStandardHeader.prepend}>
            <i className="icon icon-plus">
              <PlusIcon
                width={24}
                height={24}
                alt="Add"
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
                  to={`${this.props.match && this.props.match.url}/${
                    media.mediaId
                  }`}
                >
                  {children}
                </Link>
              )}
            />
          </div>
          <div className={viewContainerStyles.sidebar}>
            <Sidebar>
              <SidebarControl title="Uploader">
                <em>to be reimplemented</em>
              </SidebarControl>

              <SidebarControl title="File type">
                <SegmentedControl
                  value={query.type}
                  options={[null, 'All', 'image', 'Images', 'video', 'Videos']}
                  onChange={this.handleUpdate.bind(this, 'type')}
                />
              </SidebarControl>

              <SidebarControl title="Order">
                <SegmentedControl
                  value={query.order}
                  options={['created_desc', 'Recent', 'created_asc', 'Oldest']}
                  onChange={this.handleUpdate.bind(this, 'order')}
                />
              </SidebarControl>
            </Sidebar>
          </div>
        </div>
      </ViewContainer>
    );
  }
}

export default compose(
  withRouter,
  connect(
    (state: RootState) => ({
      uploadProgress: state.uploadProgress,
      vertical: state.verticals.selectedVertical,
    }),
    {
      uploadRequest: MediaListActions.upload.request,
    }
  )
)(MediaListPage);
