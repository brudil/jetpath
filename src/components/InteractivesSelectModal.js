import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { modalWrapper } from './Modal';
import * as InteractivesActions from '../ducks/Interactives';
import PaginationNav from '../components/PaginationNav';

class InteractivesSelectModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
    };

    this.handlePagination = this.handlePagination.bind(this);
  }

  componentWillMount() {
    this.loadCurrentPage();
  }

  loadCurrentPage() {
    this.props.dispatch(
      InteractivesActions.loadInteractivesList(
        { page: this.state.page, order: 'created_desc' },
        5
      )
    );
  }

  handleClose() {
    this.props.close();
  }

  handlePagination(page) {
    this.setState({ page }, this.loadCurrentPage.bind(this));
  }

  renderModal() {
    const { hasNext, interactiveItems } = this.props;
    const { page } = this.state;
    const pagination = (
      <PaginationNav
        hasNext={hasNext}
        currentPage={page}
        onChange={this.handlePagination}
      />
    );

    return (
      <div>
        <header className="modal__header" />
        <div className="modal__body">
          {pagination}
          <ul>
            {interactiveItems.map(item => (
              <li>
                <button onClick={this.props.onSelect.bind(null, item.slug)}>
                  {item.slug}
                </button>
              </li>
            ))}
          </ul>
          {pagination}
        </div>
      </div>
    );
  }

  render() {
    return <div className="media-select-modal">{this.renderModal()}</div>;
  }
}

InteractivesSelectModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  interactiveItems: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  hasNext: PropTypes.bool.isRequired,
};

export default modalWrapper()(
  connect(state => ({
    interactiveItems: state.interactives.list.map(
      id => state.entities.interactives[id]
    ),
    hasNext: state.interactives.hasNext,
  }))(InteractivesSelectModal)
);
