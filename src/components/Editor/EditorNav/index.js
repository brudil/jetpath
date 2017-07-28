import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

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
    } = this.props;
    const basePath = `/@${vertical.identifier}/editor/${pathId}`;

    return (
      <div className={styles.root}>
        <div className={styles.main}>
          <input
            className={styles.headlineInput}
            value={headline}
            type="text"
            onChange={this.handleHeadlineChange}
          />
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <Link
                className={styles.listItemLink}
                activeClassName={styles.listItemLink_active}
                to={basePath}
                onlyActiveOnIndex
              >
                Compose
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link
                className={styles.listItemLink}
                activeClassName={styles.listItemLink_active}
                to={`${basePath}/metadata`}
              >
                Metadata
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link
                className={styles.listItemLink}
                activeClassName={styles.listItemLink_active}
                to={`${basePath}/workflow`}
              >
                Workflow
              </Link>
            </li>
          </ul>
          <button
            className={styles.saveButton}
            disabled={!hasChangesFromSaved}
            onClick={onSave}
          >
            {isLocal ? 'Create' : 'Save'}
          </button>
        </div>
        <div className={styles.secondary}>
          <div className={styles.info}>
            {stats.get('wordCount')} words. {Math.round(stats.get('wordCount') / 270)} minute read.
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
  hasChangesFromSaved: PropTypes.bool,
  onSave: PropTypes.func,
  onHeadlineUpdate: PropTypes.func,
  pathId: PropTypes.string,
  stats: PropTypes.object,
};

export default EditorNav;
