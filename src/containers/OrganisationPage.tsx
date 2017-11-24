import React from 'react';
import filter from 'lodash/filter';
import { connect } from 'react-redux';
import cx from 'classnames';
import { TitleSelection, SelectionItem } from '../components/TitleSelection';
import * as OrgansiationActions from '../ducks/Organisation';
import TopicEditForm from '../components/TopicEditForm';
import SectionEditForm from '../components/SectionEditForm';
import Button from '../components/Button';

import stylesShelter from '../styles/components/BusShelter.css';
import stylesView from '../styles/components/ViewContainer.css';
import ViewContainer from '../components/ViewContainer';
import { RootState } from '../types';
import { OrganisationState } from '../ducks/Organisation';
import Helmet from 'react-helmet';

// this is very `any` type heavy - i'm going to rewrite this page soon, so didn't bother typing

interface IProps {
  updateSection: typeof OrgansiationActions.updateSection;
  updateTopic: typeof OrgansiationActions.updateTopic;
  createTopic: typeof OrgansiationActions.createTopic;
  getAllSections: typeof OrgansiationActions.getAllSections;
  getTopicsForSection: typeof OrgansiationActions.getTopicsForSection;
  saveSection: typeof OrgansiationActions.saveSection;
  saveTopic: typeof OrgansiationActions.saveTopic;
  selectNewSection: typeof OrgansiationActions.selectNewSection;
  selectNewTopic: typeof OrgansiationActions.selectNewTopic;
  selectSection: typeof OrgansiationActions.selectSection;
  selectTopic: typeof OrgansiationActions.selectTopic;

  organisation: OrganisationState;

  selectedSection: any; // todo
  selectedTopic: any; // todo
  sectionList: any; // todo
  selectedTopicList: any; // todo
}

class OrganisationPage extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.handleSelectSection = this.handleSelectSection.bind(this);
    this.handleSelectTopic = this.handleSelectTopic.bind(this);
    this.handleSectionSave = this.handleSectionSave.bind(this);
    this.handleTopicSave = this.handleTopicSave.bind(this);
    this.handleSelectNewTopic = this.handleSelectNewTopic.bind(this);
    this.handleSelectNewSection = this.handleSelectNewSection.bind(this);
  }

  componentDidMount() {
    this.props.getAllSections();
  }

  handleSelectSection(id: number) {
    this.props.selectSection(id);
  }

  handleSelectTopic(id: number) {
    this.props.selectTopic(id);
  }

  handleSectionSave(form: any) {
    const {
      organisation: { selectedSectionId, blankOf },
      updateSection,
    } = this.props;
    if (selectedSectionId) {
      updateSection(selectedSectionId, form);
    }

    if (blankOf === 'section') {
      // createSection(form);
    }
  }

  handleTopicSave(form: any) {
    const {
      organisation: { selectedSectionId, selectedTopicId, blankOf },
      updateTopic,
      createTopic,
    } = this.props;

    if (selectedTopicId) {
      updateTopic(selectedTopicId, form);
    }

    if (blankOf === 'topic' && selectedSectionId !== null) {
      createTopic(selectedSectionId, form);
    }
  }

  handleSelectNewTopic() {
    this.props.selectNewTopic();
  }

  handleSelectNewSection() {
    this.props.selectNewSection();
  }

  renderSections(list: any, childrenOf = null) {
    const filteredList = filter(list, { parent: childrenOf });

    const { selectedSectionId, selectedTopicId } = this.props.organisation;

    return (
      <ul className={stylesShelter.col}>
        <li className={stylesShelter.colHeader}>Sections</li>
        {filteredList.map((item: any) => (
          <li
            className={cx(stylesShelter.item, {
              [stylesShelter.itemSelected]:
                item.id === selectedSectionId && selectedTopicId === null,
              [stylesShelter.itemSelectedDull]:
                item.id === selectedSectionId && selectedTopicId !== null,
            })}
            key={item.id}
            onClick={this.handleSelectSection.bind(this, item.id)}
          >
            <div>{item.title}</div>
            <ul className="bus-shelter__sub-col" />
          </li>
        ))}
        <li className="bus-shelter__item-add">
          <Button text="Add section" onClick={this.handleSelectNewSection} />
        </li>
      </ul>
    );
  }

  renderTopics(list: any) {
    if (!this.props.selectedSection || list === null) {
      return <ul className={stylesShelter.col} />;
    }

    return (
      <ul className={stylesShelter.col}>
        <li className={stylesShelter.colHeader}>
          Topics in {this.props.selectedSection.title}
        </li>
        {list
          ? list.map((item: any) => (
              <li
                className={cx(stylesShelter.item, {
                  [stylesShelter.itemSelected]:
                    item.id === this.props.organisation.selectedTopicId,
                })}
                key={item.id}
                onClick={this.handleSelectTopic.bind(this, item.id)}
              >
                <div>{item.title}</div>
              </li>
            ))
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
      <ViewContainer>
        <Helmet>
          <title>Organisation</title>
        </Helmet>

        <header className="standard-header">
          <TitleSelection
            className="standard-header__title"
            value="sections"
            onSelection={() => null}
          >
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
            <div className="sidebar">{this.renderSidebar()}</div>
          </div>
        </div>
      </ViewContainer>
    );
  }
}

export default connect(
  (state: RootState) => {
    const { organisation, entities } = state;
    const selectedTopicMap =
      organisation.selectedSectionId !== null
        ? organisation.topicListMap[organisation.selectedSectionId]
        : null;
    return {
      sectionList: organisation.sectionList.map(id => entities.sections[id]),
      selectedSection:
        organisation.selectedSectionId !== null
          ? entities.sections[organisation.selectedSectionId]
          : null,
      selectedTopic:
        organisation.selectedTopicId !== null
          ? entities.topics[organisation.selectedTopicId]
          : null,
      selectedTopicList: selectedTopicMap
        ? selectedTopicMap.map(id => entities.topics[id])
        : null,
      organisation,
    };
  },
  {
    // goodness
    updateSection: OrgansiationActions.updateSection,
    updateTopic: OrgansiationActions.updateTopic,
    createTopic: OrgansiationActions.createTopic,
    getAllSections: OrgansiationActions.getAllSections,
    getTopicsForSection: OrgansiationActions.getTopicsForSection,
    saveSection: OrgansiationActions.saveSection,
    saveTopic: OrgansiationActions.saveTopic,
    selectNewSection: OrgansiationActions.selectNewSection,
    selectNewTopic: OrgansiationActions.selectNewTopic,
    selectSection: OrgansiationActions.selectSection,
    selectTopic: OrgansiationActions.selectTopic,
  }
)(OrganisationPage);
