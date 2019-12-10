import cx from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import JetpathLogo from '../JetpathLogo';
import UserMenu from '../../components/UserMenu';
import verticals from '../../verticals';

import ContentIcon from './content.svg';
import DashboardIcon from './dashboard.svg';
import MediaIcon from './media.svg';
import OrganisationIcon from './organisation.svg';

import * as styles from './GlobalHeader.css';
import { pure } from 'recompose';
import { RootState } from '../../types';
import { compose } from 'recompose';

const style = styles as any;

interface OwnProps {

}

interface GivenProps {
  vertical: { identifier: string; name: string } | null;
  children?: any;
}

type IProps = OwnProps & GivenProps;

const GlobalHeader: React.FC<IProps> = (props) => {
  const { vertical } = props;

  if (!vertical) {
    return null;
  }

  const verticalLinkTo = (part: string) => `/@${vertical.identifier}/${part}`;

  const VerticalLogo = verticals[vertical.identifier].logoHeader as any;

  return (
    <div className={cx(styles.root, style[`vertical_${vertical.identifier}`])}>
      <header className={styles.header}>
        <h1 className={styles.logoHeading}>
          {vertical ? (
            <Link to={verticalLinkTo('dashboard')}>
              <VerticalLogo
                className={styles.verticalLogo}
                alt={vertical.name}
              />
            </Link>
          ) : (
            <Link to="/">
              <JetpathLogo />
            </Link>
          )}
        </h1>
        {vertical ? (
          <menu className={styles.menu}>
            <ul>
              <li className={styles.menuItem} title="Dashboard">
                <Link to={verticalLinkTo('dashboard')}>
                  <DashboardIcon />
                </Link>
              </li>
              <li className={styles.menuItem} title="Content">
                <Link
                  to={verticalLinkTo(
                    'content?order=updated_desc&state=internal&status'
                  )}
                >
                  <ContentIcon />
                </Link>
              </li>
              <li className={styles.menuItem} title="Media">
                <Link to={verticalLinkTo('media')}>
                  <MediaIcon />
                </Link>
              </li>
              <li className={styles.menuItem} title="Organisation">
                <Link to={verticalLinkTo('organisation')}>
                  <OrganisationIcon />
                </Link>
              </li>
            </ul>
          </menu>
        ) : null}
      </header>
      <footer className={styles.footer}>
        <UserMenu />
        <Link className={styles.credits} to="/verticals">
          <JetpathLogo />
          <div>
            <p>v8.0</p>
          </div>
        </Link>
      </footer>
    </div>
  );
}

export default compose<IProps, OwnProps>(
  connect((state: RootState) => ({
    vertical: state.verticals.selectedVertical,
    state,
  })),
  pure
)(GlobalHeader);
