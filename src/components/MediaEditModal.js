import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TagsInput from 'react-tagsinput';
import Immutable from 'immutable';
import SmartDate from './SmartDate';
import { modalWrapper } from './Modal';
import MediaDisplay from './MediaDisplay';
import * as MediaEditModalActions from '../actions/MediaEditModalActions';
import { formly } from '../libs/form';
import Button from './Button';

class MediaEditModal extends React.Component {
  componentDidMount() {
    this.props.dispatch(MediaEditModalActions.open(this.props.conf.id));
  }

  handleSave() {
    this.props.dispatch(MediaEditModalActions.save(this.props.mediamodal.data));
  }

  handleMediaChange(key, value) {
    this.props.dispatch(MediaEditModalActions.update(key, value));
  }

  handleMediaFormChange(key, event) {
    this.handleMediaChange(key, event.target.value);
  }

  handleTagsChange(tags) {
    this.handleMediaChange('tags', Immutable.fromJS(tags));
  }

  renderModal() {
    const serverMedia = this.props.mediamodal.serverData;
    const media = this.props.mediamodal.data;
    const unchanged = Immutable.is(media, serverMedia);
    const form = this.props.form.modal;

    return (
      <div>
        <header className="modal__header" />
        <div className="modal__body">
          <div className="">
            Uploaded <SmartDate value={media.get('created_at')} />
          </div>
          <TagsInput
            value={media.get('tags').toJS()}
            onChange={this.handleTagsChange.bind(this)}
          />

          <h2>Credits</h2>
          <input
            value={media.get('creditUrl')}
            onChange={form('creditUrl', formly.event)}
            type="url"
          />
          <input
            value={media.get('creditTitle')}
            onChange={form('creditTitle', formly.event)}
            type="text"
          />

          <Button
            onClick={unchanged ? this.props.close : this.handleSave.bind(this)}
            text={unchanged ? 'Close' : 'Save'}
          />

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
      <div className="media-edit-modal">
        {this.props.mediamodal.data === null ? null : this.renderModal()}
      </div>
    );
  }
}

MediaEditModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  mediamodal: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  conf: PropTypes.object.isRequired,
};

export default modalWrapper()(
  connect(state => ({
    mediamodal: state.mediamodal,
  }))(MediaEditModal)
);
