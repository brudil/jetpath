import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { modalWrapper } from './Modal';
import * as MediaActions from '../actions/MediaActions';
import * as MediaListActions from '../actions/MediaListActions';
import MediaUploadContainer from './MediaUploadContainer';
import MediaGrid from './MediaGrid';
import PaginationNav from '../components/PaginationNav';

class MediaSelectModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
    };

    this.handlePagination = this.handlePagination.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  componentWillMount() {
    this.loadCurrentPage();
  }

  loadCurrentPage() {
    this.props.dispatch(
      MediaListActions.loadMediaList(
        { page: this.state.page, order: 'created_desc' },
        5
      )
    );
  }

  handleClose() {
    this.props.close();
  }

  handleFile(file) {
    this.props.dispatch(MediaActions.upload(file));
  }

  handlePagination(page) {
    this.setState({ page }, this.loadCurrentPage.bind(this));
  }

  renderModal() {
    const { hasNext } = this.props;
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
          <MediaUploadContainer onFile={this.handleFile}>
            {pagination}
            <MediaGrid
              media={this.props.mediaItems}
              onSelect={this.props.onSelect}
            />
            {pagination}
          </MediaUploadContainer>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="media-select-modal">
        {this.renderModal()}
      </div>
    );
  }
}

MediaSelectModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  mediaItems: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  hasNext: PropTypes.bool.isRequired,
};

export default modalWrapper()(
  connect(state => ({
    mediaItems: state.mediaList.list.map(id => state.entities.media[id]),
    hasNext: state.mediaList.hasNext,
  }))(MediaSelectModal)
);
