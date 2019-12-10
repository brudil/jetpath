import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as AuthorActions from '../../ducks/Authors';
import { EntityMap, RootState } from '../../types';
import { Author, AuthorsState } from '../../ducks/Authors';

interface ComponentProps {
  value: number[];
  onChange(value: number[]): void;
}

interface InternalProps {
  suggestions: AuthorsState['suggestions'];
  authors: EntityMap<Author>;
  keywordMap: any; // todo
  requestSuggestions: typeof AuthorActions.requestSuggestions;
}

type IProps = InternalProps & ComponentProps;

class AuthorsSelector extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      keyword: '',
    };
  }

  componentDidMount() {
    this.props.requestSuggestions('');
  }

  handleInputChange(value: string) {
    this.props.requestSuggestions(value);
    this.setState({ keyword: value });
  }

  onChange(selected: any) {
    this.props.onChange(
      (selected).map((item: any) => item.value as number)
    );
  }

  render() {
    const { suggestions, authors, value } = this.props;

    const options: any = suggestions
      .map(id => authors[id])
      .map(author => ({
        value: author.id,
        label: author.name,
      }));

    return (
      <div>
        <Select
          options={options}
          onInputChange={this.handleInputChange}
          onChange={this.onChange}
          value={value}
          multi
        />
      </div>
    );
  }
}

export default connect(
  (state: RootState) => ({
    suggestions: state.authors.suggestions,
    keywordMap: state.topics.keywordMap,
    authors: state.entities.authors,
  }),
  {
    requestSuggestions: AuthorActions.requestSuggestions,
  }
)(AuthorsSelector);
