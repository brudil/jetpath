import cx from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import JetpathLogo from '../JetpathLogo';
import UserMenu from '../../components/UserMenu';
import verticals from '../../verticals';

import contentIcon from './content.svg';
import dashboardIcon from './dashboard.svg';
import mediaIcon from './media.svg';
import organisationIcon from './organisation.svg';

import * as styles from './GlobalHeader.css';
import { pure } from 'recompose';
import { RootState } from '../../types';
import { compose } from 'redux';

const style = styles as any;

function GlobalHeader(props: {
  vertical: { identifier: string; name: string } | null;
  children?: any;
}) {
  const { vertical } = props;

  if (!vertical) {
    return null;
  }

  const verticalLinkTo = (part: string) => `/@${vertical.identifier}/${part}`;

  return (
    <div className={cx(styles.root, style[`vertical_${vertical.identifier}`])}>
      <header className={styles.header}>
        <h1 className={styles.logoHeading}>
          {vertical ? (
            <Link to={verticalLinkTo('dashboard')}>
              <img
                className={styles.verticalLogo}
                src={verticals[vertical.identifier].logoHeader}
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
                  <img src={dashboardIcon} />
                </Link>
              </li>
              <li className={styles.menuItem} title="Content">
                <Link
                  to={verticalLinkTo(
                    'content?order=updated_desc&state=internal&status'
                  )}
                >
                  <img src={contentIcon} />
                </Link>
              </li>
              <li className={styles.menuItem} title="Media">
                <Link to={verticalLinkTo('media')}>
                  <img src={mediaIcon} />
                </Link>
              </li>
              <li className={styles.menuItem} title="Organisation">
                <Link to={verticalLinkTo('organisation')}>
                  <img src={organisationIcon} />
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

export default compose(
  connect((state: RootState) => ({
    vertical: state.verticals.selectedVertical,
    state,
  })),
  pure
)(GlobalHeader) as React.SFC<{}>;
