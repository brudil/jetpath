import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TagsInput from 'react-tagsinput';
import Immutable from 'immutable';
import SmartDate from '../SmartDate';
import { modalWrapper } from '../Modal';
import MediaDisplay from '../MediaDisplay';
import * as MediaEditModalActions from '../../ducks/MediaEdit';
import * as MediaListActions from '../../ducks/MediaList';
import * as ModalActions from '../../ducks/Modal';
import { formly } from '../../libs/form';
import Button from '../Button';
import { createChangeHandler } from '../../libs/form/index';

import style from './MediaEditModal.css';

class MediaEditModal extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(MediaEditModalActions.open(this.props.conf.id));
  }

  handleSave() {
    this.props.dispatch(MediaEditModalActions.save(this.props.mediamodal.data));
  }

  handleDelete() {
    this.props.dispatch(MediaListActions.deleteMedia(this.props.mediamodal.id));
    this.props.dispatch(ModalActions.closeById(this.props.conf.id));
  }

  handleMediaChange(key, value) {
    this.props.dispatch(MediaEditModalActions.update(key, value));
  }

  handleMediaFormChange(key, event) {
    this.handleMediaChange(key, event.target.value);
  }

  handleTagsChange(tags) {
    this.handleMediaChange(['tags'], Immutable.fromJS(tags));
  }

  renderModal() {
    const serverMedia = this.props.mediamodal.serverData;
    const media = this.props.mediamodal.data;
    const unchanged = Immutable.is(media, serverMedia);
    const form = createChangeHandler(
      this.props.dispatch,
      MediaEditModalActions.update
    );
    return (
      <div>
        <header className="modal__header" />
        <div className="modal__body">
          <div className="">
            id: #<input type="number" value={media.get('id')} readOnly />
          </div>
          <div className="">
            Uploaded <SmartDate value={media.get('created')} />
          </div>
          <TagsInput
            value={media.get('tags').toJS()}
            onChange={this.handleTagsChange.bind(this)}
          />
          <h2>Credits</h2>
          <label htmlFor="creditUrl">Credit URL</label>
          <input
            id="creditUrl"
            value={media.get('credit_url')}
            onChange={form('credit_url', formly.event)}
            type="url"
          />
          <label htmlFor="creditTitle">Credit title</label>
          <input
            id="creditTitle"
            value={media.get('credit_title')}
            onChange={form('credit_title', formly.event)}
            type="text"
          />
          <Button
            onClick={unchanged ? this.props.close : this.handleSave.bind(this)}
            text={unchanged ? 'Close' : 'Save'}
          />
          <Button onClick={this.handleDelete} text="Delete" />
          <div className="media-edit-modal__metadata">
            {media.hasIn(['metadata', 'width']) &&
            media.hasIn(['metadata', 'height'])
              ? `${media.getIn(['metadata', 'width'])}x${media.getIn([
                  'metadata',
                  'height',
                ])}`
              : null}
          </div>
          <div className="media-edit-modal__preview-stage">
            <MediaDisplay media={media.toJS()} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={style.root}>
        {this.props.mediamodal.data === null ? null : this.renderModal()}
      </div>
    );
  }
}

MediaEditModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  mediamodal: PropTypes.object.isRequired,
  conf: PropTypes.object.isRequired,
};

export default modalWrapper()(
  connect(state => ({
    mediamodal: state.mediamodal,
  }))(MediaEditModal)
);
