import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import intersection from 'lodash/intersection';
import { connect } from 'react-redux';
import qs from 'query-string';
import WorksList from '../components/WorksList';
import { TitleSelection, SelectionItem } from '../components/TitleSelection';
import DocumentTitle from '../components/DocumentTitle';
import ViewContainer from '../components/ViewContainer';
import PaginationNav from '../components/PaginationNav';
import SegmentedControl from '../components/SegmentedControl';
import NoListItems from '../components/NoListItems';
import Sidebar, { SidebarControl, SidebarInput } from '../components/Sidebar';
import LoadingContent from '../components/LoadingContent';
import AuthorsSelector from '../components/AuthorsSelector';
import * as ContentListActions from '../ducks/ContentList';
import { generateFromConstants } from '../lang/utils';
import {
  contentForm as contentFormLang,
  contentTone as contentToneLang,
  contentStatus as contentStatusLang,
} from '../lang/content_attrs';

import ViewContainerStyles from '../styles/components/ViewContainer.css';
import stylesStandardHeader from '../styles/components/StandardHeader.css';
import filterPresetsMatch from '../libs/filterPresetsMatch';
import { RootState } from '../types';
import { RouteComponentProps } from 'react-router';
import { Vertical } from '../ducks/Vertical';
import { Form, Status, Tone } from '../libs/constants';

const presets: any = {
  // todo
  ready: {
    state: 'internal',
    status: Status.Finished,
  },
  published: {
    state: 'live',
  },
  recent: {
    state: 'internal',
    order: 'updated_desc',
    status: null,
  },
};

interface RouterParams {}

interface IProps extends RouteComponentProps<RouterParams> {
  vertical: Vertical;
  contentlist: any; // todo
  contentListItems: any; // todo
  isLoading: boolean;

  loadContent: typeof ContentListActions.loadContent;
}

class ContentListPage extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.handlePagination = this.handlePagination.bind(this);
    this.handleFilterPresetChange = this.handleFilterPresetChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
  }

  componentDidMount() {
    const query = this.getQueryData();
    this.props.loadContent(query);
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (!isEqual(this.getQueryData(), this.getQueryData(nextProps))) {
      this.props.loadContent(this.getQueryData(nextProps));
    }
  }

  getQueryData(props: IProps | null = null): any {
    // todo
    const query = qs.parse(
      props === null ? this.props.location.search : props.location.search
    );
    return {
      order: query.order || 'created_desc',
      state: query.state || null,
      status: parseInt(query.status, 10) || null,
      tone: query.tone || null,
      form: query.form || null,
      search: query.search || '',
      authors: query.authors || [],
      page: parseInt(query.page, 10) || 1,
    };
  }

  handleFilterPresetChange(presetId: string) {
    this.handleQueryChange(presets[presetId]);
  }

  handleQueryChange(filters: any, createHistoryItem = false) {
    const action = createHistoryItem
      ? this.props.history.push
      : this.props.history.replace;

    action(
      `/@${this.props.vertical.identifier}/content?${qs.stringify(filters)}`
    );
  }

  handleUpdate(key: string, value: string) {
    const query = this.getQueryData();
    query[key] = value;
    this.handleQueryChange(query);
  }

  handleInputUpdate(key: string, event: React.ChangeEvent<HTMLInputElement>) {
    const query = this.getQueryData();
    query[key] = event.target.value;
    this.handleQueryChange(query);
  }

  handleAuthorChange(value: string) {
    const query = this.getQueryData();
    query.authors = value;
    this.handleQueryChange(query);
  }

  handlePagination(page: number) {
    this.handleQueryChange({ ...this.getQueryData(), page }, true);
  }

  renderContent() {
    if (this.props.isLoading) {
      return <LoadingContent />;
    }

    const { contentListItems } = this.props;
    const { contentlist: { hasNext, count } } = this.props;
    const query = this.getQueryData();

    if (contentListItems.length > 0) {
      return (
        <div>
          <WorksList works={contentListItems} vertical={this.props.vertical} />
          <PaginationNav
            currentPage={query.page}
            hasNext={hasNext}
            total={count}
            onChange={this.handlePagination}
          />
        </div>
      );
    }

    return <NoListItems text="No content meets criteria" />;
  }

  render() {
    const query = this.getQueryData();
    const vertical = this.props.vertical;

    return (
      <DocumentTitle title="Content">
        <ViewContainer>
          <header className={stylesStandardHeader.root}>
            <Link
              to={`/@${vertical.identifier}/editor/new`}
              className={stylesStandardHeader.prepend}
            >
              <i className="icon icon-plus">
                <img
                  // eslint-disable-next-line
                  src={require('icons/plus.svg')}
                  alt="Add"
                />
              </i>
            </Link>
            <TitleSelection
              onSelection={this.handleFilterPresetChange}
              className={stylesStandardHeader.title}
              value={filterPresetsMatch(query, presets, 'custom')}
            >
              <SelectionItem name="recent">Recently Edited</SelectionItem>
              <SelectionItem name="ready">Ready</SelectionItem>
              <SelectionItem name="published">Published</SelectionItem>
              <SelectionItem name="custom">Filtered</SelectionItem>
            </TitleSelection>
          </header>
          <div className={ViewContainerStyles.root}>
            <div className={ViewContainerStyles.content}>
              {this.renderContent()}
            </div>
            <div className={ViewContainerStyles.sidebar}>
              <Sidebar>
                <SidebarControl title="Search">
                  <SidebarInput
                    type="text"
                    value={query.search}
                    onChange={this.handleInputUpdate.bind(this, 'search')}
                  />
                </SidebarControl>
                <SidebarControl title="Authors">
                  <AuthorsSelector
                    onChange={this.handleAuthorChange}
                    value={parseInt(query.authors, 10)}
                  />
                </SidebarControl>
                <SidebarControl title="State">
                  <SegmentedControl
                    value={query.state}
                    options={[
                      null,
                      'All',
                      'internal',
                      'Internal',
                      'live',
                      'Live',
                    ]}
                    onChange={this.handleUpdate.bind(this, 'state')}
                  />
                </SidebarControl>

                <SidebarControl title="Status">
                  <SegmentedControl
                    value={query.status}
                    options={[
                      null,
                      'All',
                      ...generateFromConstants(contentStatusLang, [
                        Status.Stub,
                        Status.Writing,
                        Status.Finished,
                      ]),
                    ]}
                    onChange={this.handleUpdate.bind(this, 'status')}
                  />
                </SidebarControl>

                <SidebarControl title="Form">
                  <SegmentedControl
                    value={query.form}
                    options={[
                      null,
                      'All',
                      ...generateFromConstants(
                        contentFormLang,
                        intersection(vertical.content_forms, [
                          Form.Article,
                          Form.Video,
                          Form.Interactive,
                          Form.Gallery,
                        ])
                      ),
                    ]}
                    onChange={this.handleUpdate.bind(this, 'form')}
                  />
                </SidebarControl>

                <SidebarControl title="Tone">
                  <SegmentedControl
                    value={query.tone}
                    options={[
                      null,
                      'All',
                      ...generateFromConstants(
                        contentToneLang,
                        intersection(vertical.content_tones, [
                          Tone.Content,
                          Tone.Review,
                          Tone.Viewpoint,
                          Tone.Storytelling,
                          Tone.Interactive,
                          Tone.Guide,
                        ])
                      ),
                    ]}
                    onChange={this.handleUpdate.bind(this, 'tone')}
                  />
                </SidebarControl>

                <SidebarControl title="Order">
                  <SegmentedControl
                    value={query.order}
                    options={[
                      'updated_desc',
                      'Recent',
                      'updated_asc',
                      'Oldest',
                    ]}
                    onChange={this.handleUpdate.bind(this, 'order')}
                  />
                </SidebarControl>
                {/*
                <SidebarControl title="Section">
                  <input type="text" />
                </SidebarControl>

                <SidebarControl title="Topics">
                  <input type="text" />
                </SidebarControl>
                */}
              </Sidebar>
            </div>
          </div>
        </ViewContainer>
      </DocumentTitle>
    );
  }
}

export default withRouter(
  connect(
    (state: RootState) => ({
      contentlist: state.contentList,
      contentListItems: state.contentList.list.map((id: number) => ({
        ...state.entities.contentList[id],
      })),
      isLoading: state.contentList.loading,
      vertical: state.verticals.selectedVertical,
    }),
    {
      loadContent: ContentListActions.loadContent,
    }
  )(ContentListPage)
);
