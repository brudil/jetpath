import React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as TopicActions from '../../ducks/Topic';
import { EntityMap, RootState } from '../../types';
import { Topic, TopicsStore } from '../../ducks/Topic';

interface IProps {
  getTopicsForKeyword: typeof TopicActions.getTopicsForKeyword;
  onChange(value: Immutable.Set<number>): void;
  value: Immutable.Set<number>;
  isLoading: boolean;
  keywordMap: TopicsStore['keywordMap'];
  topics: EntityMap<Topic>;
}

interface IState {
  keyword: string;
}

class TopicsSelector extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddChange = this.handleAddChange.bind(this);

    this.state = {
      keyword: '',
    };
  }

  componentDidMount() {
    this.props.getTopicsForKeyword('');
  }

  handleInputChange(value: string) {
    this.props.getTopicsForKeyword(value);
    this.setState({ keyword: value });
  }

  handleAddChange(selected: any) {
    if (selected !== null) {
      const { value } = this.props;
      this.props.onChange(value.add(selected.value));
    }
  }

  handleRemoveChange(removeId: number) {
    const { value } = this.props;
    this.props.onChange(value.delete(removeId));
  }

  render() {
    const { isLoading, keywordMap, topics, value } = this.props;

    let options: Topic[] = [];
    if (
      {}.hasOwnProperty.call(keywordMap, this.state.keyword) &&
      keywordMap[this.state.keyword] !== undefined
    ) {
      options = keywordMap[this.state.keyword]
        .filter((id: number) => !value.has(id))
        .map((id: number) => topics[id]);
    }

    const suggestionOptions: any = options.map((topic: Topic) => ({
      value: topic.id,
      label: topic.title,
    }));
    const currentTopics = value
      .filter(id => ({}.hasOwnProperty.call(topics, id)))
      .map(sectionId => topics[sectionId]);
    return (
      <div>
        <ul>
          {currentTopics.map(topic => (
            <li
              key={topic.id}
              onClick={this.handleRemoveChange.bind(this, topic.id)}
            >
              {topic.title}
            </li>
          ))}
        </ul>
        <Select
          isLoading={isLoading}
          options={suggestionOptions}
          onInputChange={this.handleInputChange}
          onChange={this.handleAddChange}
        />
      </div>
    );
  }
}

export default connect(
  (state: RootState) => ({
    isLoading: state.topics.isLoading,
    keywordMap: state.topics.keywordMap,
    topics: state.entities.topics,
  }),
  {
    getTopicsForKeyword: TopicActions.getTopicsForKeyword,
  }
)(TopicsSelector);
