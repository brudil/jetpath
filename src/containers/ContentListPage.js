import PropTypes from 'prop-types';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import without from 'lodash/without';
import isEqual from 'lodash/isEqual';
import intersection from 'lodash/intersection';
import { connect } from 'react-redux';
import qs from 'query-string';
import {
  contentForm,
  contentStatus,
  contentState,
  contentTone,
} from '@brudil/drafty-constants';
import WorksList from '../components/WorksList';
import { TitleSelection, SelectionItem } from '../components/TitleSelection';
import DocumentTitle from '../components/DocumentTitle';
import ViewContainer from '../components/ViewContainer';
import PaginationNav from '../components/PaginationNav';
import SegmentedControl from '../components/SegmentedControl';
import NoListItems from '../components/NoListItems';
import Sidebar, { SidebarControl } from '../components/Sidebar';
import LoadingContent from '../components/LoadingContent';
import AuthorsSelector from '../components/AuthorsSelector';
import * as ContentListActions from '../ducks/ContentList';
import { generateFromConstants } from '../lang/utils';
import {
  contentForm as contentFormLang,
  contentTone as contentToneLang,
  contentState as contentStateLang,
  contentStatus as contentStatusLang,
} from '../lang/content_attrs';

import ViewContainerStyles from '../styles/components/ViewContainer.css';
import stylesStandardHeader from '../styles/components/StandardHeader.css';

const presets = {
  upcoming: {
    state: 'upcoming',
  },
  published: {
    state: 'published',
  },
  all: {},
  recent: {
    order: 'created_desc',
  },
};

class ContentListPage extends React.Component {
  constructor(props) {
    super(props);

    this.handlePagination = this.handlePagination.bind(this);
    this.handleFilterPresetChange = this.handleFilterPresetChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
  }

  componentDidMount() {
    const query = this.getQueryData();
    this.props.dispatch(ContentListActions.loadContent(query));
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.getQueryData(), this.getQueryData(nextProps))) {
      this.props.dispatch(
        ContentListActions.loadContent(this.getQueryData(nextProps))
      );
    }
  }

  getQueryData(props = null) {
    const query = qs.parse(
      props === null ? this.props.location.search : props.location.search
    );
    return {
      order: query.order || 'created_desc',
      state: query.state || null,
      status: query.status || null,
      tone: query.tone || null,
      form: query.form || null,
      search: query.search || '',
      authors: query.authors || [],
      page: parseInt(query.page, 10) || 1,
    };
  }

  handleFilterPresetChange(presetId) {
    this.handleQueryChange(presets[presetId]);
  }

  handleQueryChange(filters, createHistoryItem = false) {
    const action = createHistoryItem
      ? this.props.history.push
      : this.props.history.replace;

    action(
      `/@${this.props.vertical.identifier}/content?${qs.stringify(filters)}`
    );
  }

  handleUpdate(key, value) {
    const query = this.getQueryData();
    query[key] = value;
    this.handleQueryChange(query);
  }

  handleInputUpdate(key, event) {
    const query = this.getQueryData();
    query[key] = event.target.value;
    this.handleQueryChange(query);
  }

  handleAuthorChange(value) {
    const query = this.getQueryData();
    query.authors = value;
    this.handleQueryChange(query);
  }

  handlePagination(page) {
    this.handleQueryChange({ ...this.getQueryData(), page }, true);
  }

  renderContent() {
    if (this.props.isLoading) {
      return <LoadingContent />;
    }

    const { contentListItems } = this.props;
    const { contentlist: { hasNext, hasPrevious } } = this.props;
    const query = this.getQueryData();

    if (contentListItems.length > 0) {
      return (
        <div>
          <WorksList
            works={contentListItems}
            vertical={this.props.vertical.identifier}
          />
          <PaginationNav
            currentPage={query.page}
            hasNext={hasNext}
            hasPrevious={hasPrevious}
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
            >
              <SelectionItem name="all">All Content</SelectionItem>
              <SelectionItem default="true" name="recent">
                Recent Edited Content
              </SelectionItem>
              <SelectionItem name="upcoming">Upcoming Content</SelectionItem>
              <SelectionItem name="published">Published Content</SelectionItem>
            </TitleSelection>
          </header>
          <div className={ViewContainerStyles.root}>
            <div className={ViewContainerStyles.content}>
              {this.renderContent()}
            </div>
            <div className={ViewContainerStyles.sidebar}>
              <Sidebar>
                <SidebarControl title="Search">
                  <Sidebar.Input
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
                        contentStatus.STATUS_STUB,
                        contentStatus.STATUS_FINISHED,
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
                          contentForm.FORM_ARTICLE,
                          contentForm.FORM_VIDEO,
                          contentForm.FORM_INTERACTIVE,
                          contentForm.FORM_GALLERY,
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
                          contentTone.TONE_CONTENT,
                          contentTone.TONE_REVIEW,
                          contentTone.TONE_VIEWPOINT,
                          contentTone.TONE_STORYTELLING,
                          contentTone.TONE_INTERACTIVE,
                          contentTone.TONE_GUIDE,
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

ContentListPage.propTypes = {
  contentlist: PropTypes.object.isRequired,
  contentListItems: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default withRouter(
  connect(state => ({
    contentlist: state.contentList,
    contentListItems: state.contentList.list.map(id => ({
      ...state.entities.contentList[id],
    })),
    isLoading: state.contentList.loading,
    vertical: state.verticals.selectedVertical,
  }))(ContentListPage)
);
