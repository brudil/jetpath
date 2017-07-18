import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Sticky } from 'react-sticky';

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
    } = this.props;
    const basePath = `/@${vertical}/editor/${pathId}`;

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
          <div className={styles.info}>saved 33 seconds ago. draft. prod.</div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Sticky stickyClassName={styles.sticky}>
        {() => this.renderDefault()}
      </Sticky>
    );
  }
}

EditorNav.propTypes = {
  vertical: PropTypes.string,
  headline: PropTypes.string,
  isLocal: PropTypes.bool,
  hasChangesFromSaved: PropTypes.bool,
  onSave: PropTypes.func,
  onHeadlineUpdate: PropTypes.func,
  pathId: PropTypes.string,
};

export default EditorNav;
