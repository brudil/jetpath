import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './EditorNav.css';
import { Vertical } from '../../../ducks/Vertical';

interface IProps {
  vertical: Vertical;
  headline: string;
  isLocal: boolean;
  isSaving: boolean;
  hasChangesFromSaved: boolean;
  onSave(): void;
  onHeadlineUpdate(headline: string): void;
  pathId: string;
  stats: any; // todo
}

class EditorNav extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.handleHeadlineChange = this.handleHeadlineChange.bind(this);
  }

  handleHeadlineChange({
    currentTarget: { value },
  }: React.ChangeEvent<HTMLInputElement>) {
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

export default EditorNav;
