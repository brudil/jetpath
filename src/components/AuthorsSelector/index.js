import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as AuthorActions from '../../ducks/Authors';
import 'style-loader!css-loader!postcss-loader!react-select/dist/react-select.css'; // eslint-disable-line

class AuthorsSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChangeBound = this.handleInputChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      keyword: '',
    };
  }

  componentDidMount() {
    this.props.dispatch(AuthorActions.requestSuggestions(''));
  }

  handleInputChange(value) {
    this.props.dispatch(AuthorActions.requestSuggestions(value));
    this.setState({ keyword: value });
  }

  onChange(selected) {
    this.props.onChange(Immutable.fromJS(selected.map(item => item.value)));
  }

  render() {
    const {
      isLoading = false,
      suggestions,
      authors,
      value,
    } = this.props;

    const options = suggestions.map(id => authors[id]).map(author => ({
      value: author.id,
      label: author.name,
    }));

    return (
      <div>
        <Select
          isLoading={isLoading}
          options={options}
          onInputChange={this.handleInputChangeBound}
          onChange={this.onChange}
          value={value.toJS()}
          multi
        />
      </div>
    );
  }
}

AuthorsSelector.propTypes = {
  value: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  keywordMap: PropTypes.object.isRequired,
  topics: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default connect(state => ({
  suggestions: state.authors.suggestions,
  keywordMap: state.topics.keywordMap,
  authors: state.entities.authors,
}))(AuthorsSelector);
