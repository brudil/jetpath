import PropTypes from 'prop-types';
import React from 'react';
import filter from 'lodash/filter';
import { connect } from 'react-redux';
import cx from 'classnames';
import { TitleSelection, SelectionItem } from '../components/TitleSelection';
import * as OrgansiationActions from '../ducks/Organisation';
import DocumentTitle from '../components/DocumentTitle';
import TopicEditForm from '../components/TopicEditForm';
import SectionEditForm from '../components/SectionEditForm';
import Button from '../components/Button';

import stylesShelter from '../styles/components/BusShelter.css';
import stylesView from '../styles/components/ViewContainer.css';
import ViewContainer from '../components/ViewContainer';

class OrganisationPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelectSection = this.handleSelectSection.bind(this);
    this.handleSelectTopic = this.handleSelectTopic.bind(this);
    this.handleSectionSave = this.handleSectionSave.bind(this);
    this.handleTopicSave = this.handleTopicSave.bind(this);
    this.handleSelectNewTopic = this.handleSelectNewTopic.bind(this);
    this.handleSelectNewSection = this.handleSelectNewSection.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(OrgansiationActions.getAllSections());
  }

  handleSelectSection(id) {
    this.props.dispatch(OrgansiationActions.selectSection(id));
  }

  handleSelectTopic(id) {
    this.props.dispatch(OrgansiationActions.selectTopic(id));
  }

  handleSectionSave(form) {
    const {
      organisation: { selectedSectionId, blankOf },
      dispatch,
    } = this.props;
    if (selectedSectionId) {
      dispatch(OrgansiationActions.updateSection(selectedSectionId, form));
    }

    if (blankOf === 'section') {
      dispatch(OrgansiationActions.createSection(form));
    }
  }

  handleTopicSave(form) {
    const {
      organisation: { selectedSectionId, selectedTopicId, blankOf },
      dispatch,
    } = this.props;

    if (selectedTopicId) {
      dispatch(OrgansiationActions.updateTopic(selectedTopicId, form));
    }

    if (blankOf === 'topic') {
      dispatch(OrgansiationActions.createTopic(selectedSectionId, form));
    }
  }

  handleSelectNewTopic() {
    this.props.dispatch(OrgansiationActions.selectNewTopic());
  }

  handleSelectNewSection() {
    this.props.dispatch(OrgansiationActions.selectNewSection());
  }

  renderSections(list, childrenOf = null) {
    const filteredList = filter(list, { parent: childrenOf });

    const { selectedSectionId, selectedTopicId } = this.props.organisation;

    return (
      <ul className={stylesShelter.col}>
        <li className={stylesShelter.colHeader}>Sections</li>
        {filteredList.map(item =>
          <li
            className={cx(stylesShelter.item, {
              [stylesShelter.item_selected]:
                item.id === selectedSectionId && selectedTopicId === null,
              [stylesShelter.item_selectedDull]:
                item.id === selectedSectionId && selectedTopicId !== null,
            })}
            key={item.id}
            onClick={this.handleSelectSection.bind(this, item.id)}
          >
            <div>
              {item.title}
            </div>
            <ul className="bus-shelter__sub-col" />
          </li>
        )}
        <li className="bus-shelter__item-add">
          <Button text="Add section" onClick={this.handleSelectNewSection} />
        </li>
      </ul>
    );
  }

  renderTopics(list) {
    if (!this.props.selectedSection || list === null) {
      return <ul className={stylesShelter.col} />;
    }

    return (
      <ul className={stylesShelter.col}>
        <li className={stylesShelter.colHeader}>
          Topics in {this.props.selectedSection.title}
        </li>
        {list
          ? list.map(item =>
              <li
                className={cx(stylesShelter.item, {
                  [stylesShelter.item_selected]:
                    item.id === this.props.organisation.selectedTopicId,
                })}
                key={item.id}
                onClick={this.handleSelectTopic.bind(this, item.id)}
              >
                <div>
                  {item.title}
                </div>
              </li>
            )
          : null}
        {!list ? <em>Loading</em> : null}
        {list.length <= 0 ? <em>Nothing here</em> : null}
        <li className="bus-shelter__item-add">
          <Button text="Add topic" onClick={this.handleSelectNewTopic} />
        </li>
      </ul>
    );
  }

  renderSidebar() {
    const {
      selectedSectionId,
      selectedTopicId,
      blankOf,
    } = this.props.organisation;

    if (!selectedSectionId && !blankOf) {
      return <em>Select an section or topic to edit.</em>;
    }

    if (selectedTopicId || blankOf === 'topic') {
      return this.renderSidebarTopic();
    } else if (selectedSectionId || blankOf === 'section') {
      return this.renderSidebarSection();
    }

    return null;
  }

  renderSidebarSection() {
    return (
      <div>
        <SectionEditForm
          onSubmit={this.handleSectionSave}
          model={
            this.props.organisation.blankOf === 'section'
              ? {}
              : this.props.selectedSection
          }
        />
      </div>
    );
  }

  renderSidebarTopic() {
    return (
      <div>
        <TopicEditForm
          onSubmit={this.handleTopicSave}
          model={
            this.props.organisation.blankOf === 'topic'
              ? {}
              : this.props.selectedTopic
          }
        />
      </div>
    );
  }

  render() {
    return (
      <DocumentTitle title="Organisation">
        <ViewContainer>
          <header className="standard-header">
            <TitleSelection className="standard-header__title" value="sections">
              <SelectionItem name="sections">Sections</SelectionItem>
              <SelectionItem name="series">Series</SelectionItem>
            </TitleSelection>
          </header>
          <div className={stylesView.root}>
            <div className={stylesView.content}>
              <div className={stylesShelter.root}>
                {this.renderSections(this.props.sectionList)}
                {this.renderTopics(this.props.selectedTopicList)}
              </div>
            </div>
            <div className={stylesView.sidebar}>
              <div className="sidebar">
                {this.renderSidebar()}
              </div>
            </div>
          </div>
        </ViewContainer>
      </DocumentTitle>
    );
  }
}

OrganisationPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedSection: PropTypes.object,
  selectedTopic: PropTypes.object,
  organisation: PropTypes.object.isRequired,
  sectionList: PropTypes.array.isRequired,
  selectedTopicList: PropTypes.array,
};

export default connect(state => {
  const { organisation, entities } = state;
  const selectedTopicMap =
    organisation.topicListMap[organisation.selectedSectionId];
  return {
    sectionList: organisation.sectionList.map(id => entities.sections[id]),
    selectedSection: entities.sections[organisation.selectedSectionId],
    selectedTopic: entities.topics[organisation.selectedTopicId],
    selectedTopicList: selectedTopicMap
      ? selectedTopicMap.map(id => entities.topics[id])
      : null,
    organisation,
  };
})(OrganisationPage);
