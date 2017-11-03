import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './EditorNav.css';

class EditorNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleHeadlineChange = this.handleHeadlineChange.bind(this);
  }

  handleHeadlineChange({ target: { value } }) {
    this.props.onHeadlineUpdate(value);
  }

  renderDefault() {
    const {
      isLocal,
      hasChangesFromSaved,
      onSave,
      pathId,
      headline,
      vertical,
      stats,
      isSaving,
    } = this.props;
    const basePath = `/@${vertical.identifier}/editor/${pathId}`;

    const saveButtonText = () => {
      if (isLocal) {
        return isSaving ? 'Creating' : 'Create';
      }

      return isSaving ? 'Saving' : 'Save';
    };

    return (
      <div className={styles.root}>
        <div className={styles.main}>
          <input
            className={styles.headlineInput}
            value={headline}
            type="text"
            onChange={this.handleHeadlineChange}
            placeholder="Headline of content"
          />
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <NavLink
                className={styles.listItemLink}
                activeClassName={styles.listItemLink_active}
                to={basePath}
                exact
              >
                Compose
              </NavLink>
            </li>
            <li className={styles.listItem}>
              <NavLink
                className={styles.listItemLink}
                activeClassName={styles.listItemLink_active}
                to={`${basePath}/metadata`}
              >
                Metadata
              </NavLink>
            </li>
            <li className={styles.listItem}>
              <NavLink
                className={styles.listItemLink}
                activeClassName={styles.listItemLink_active}
                to={`${basePath}/workflow`}
              >
                Workflow
              </NavLink>
            </li>
            <li className={styles.listItem}>
              <NavLink
                className={styles.listItemLink}
                activeClassName={styles.listItemLink_active}
                to={`${basePath}/preview`}
              >
                Preview
              </NavLink>
            </li>
          </ul>
          <button
            className={styles.saveButton}
            disabled={!hasChangesFromSaved}
            onClick={onSave}
          >
            {saveButtonText()}
          </button>
        </div>
        <div className={styles.secondary}>
          <div className={styles.info}>
            {stats.get('wordCount')} words.{' '}
            {Math.round(stats.get('wordCount') / 270)} minute read.
          </div>
        </div>
      </div>
    );
  }

  render() {
    return this.renderDefault();
  }
}

EditorNav.propTypes = {
  vertical: PropTypes.shape({
    identifier: PropTypes.string,
  }),
  headline: PropTypes.string,
  isLocal: PropTypes.bool,
  isSaving: PropTypes.bool,
  hasChangesFromSaved: PropTypes.bool,
  onSave: PropTypes.func,
  onHeadlineUpdate: PropTypes.func,
  pathId: PropTypes.string,
  stats: PropTypes.object,
};

export default EditorNav;
