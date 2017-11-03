import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as TopicActions from '../../ducks/Topic';
import 'style-loader!css-loader!postcss-loader!react-select/dist/react-select.css'; // eslint-disable-line

class TopicsSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChangeBound = this.handleInputChange.bind(this);
    this.handleAddChangeBound = this.handleAddChange.bind(this);
    this.state = {
      keyword: '',
    };
  }

  componentDidMount() {
    this.props.dispatch(TopicActions.getTopicsForKeyword(''));
  }

  handleInputChange(value) {
    this.props.dispatch(TopicActions.getTopicsForKeyword(value));
    this.setState({ keyword: value });
  }

  handleAddChange(selected) {
    const { value } = this.props;
    this.props.onChange(value.add(selected.value));
  }

  handleRemoveChange(removeId) {
    const { value } = this.props;
    this.props.onChange(value.delete(removeId));
  }

  render() {
    const { isLoading, keywordMap, topics, value } = this.props;

    let options = [];
    if (
      {}.hasOwnProperty.call(keywordMap, this.state.keyword) &&
      keywordMap[this.state.keyword] !== undefined
    ) {
      options = keywordMap[this.state.keyword]
        .filter(id => !value.has(id))
        .map(id => topics[id]);
    }

    const suggestionOptions = options.map(section => ({
      value: section.id,
      label: section.title,
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
          onInputChange={this.handleInputChangeBound}
          onChange={this.handleAddChangeBound}
        />
      </div>
    );
  }
}

TopicsSelector.propTypes = {
  value: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  keywordMap: PropTypes.object.isRequired,
  topics: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default connect(state => ({
  isLoading: state.topics.isLoading,
  keywordMap: state.topics.keywordMap,
  topics: state.entities.topics,
}))(TopicsSelector);
