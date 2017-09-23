import cx from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import JetpathLogo from '../JetpathLogo';
import UserMenu from '../../components/UserMenu';
import verticals from '../../verticals';

import * as styles from './GlobalHeader.css';

const style = styles as any;

function GlobalHeader(props: { vertical: { identifier: string, name: string } | null }) {
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
            <Link to="/">
              <JetpathLogo />
              <span className={styles.verticalJoiner}>+</span>
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
              <li className={styles.menuItem}>
                <Link
                  to={verticalLinkTo(
                    'dashboard'
                  )}
                >
                  <span>Dashboard</span>
                </Link>
              </li>
              <li className={styles.menuItem}>
                <Link
                  to={verticalLinkTo(
                    'content?order=updated_desc&state=internal&status'
                  )}
                >
                  <span>Content</span>
                </Link>
              </li>
              <li className={styles.menuItem}>
                <Link to={verticalLinkTo('media')}>
                  <span>Media</span>
                </Link>
              </li>
              <li className={styles.menuItem}>
                <Link to={verticalLinkTo('organisation')}>
                  <span>Organisation</span>
                </Link>
              </li>
            </ul>
          </menu>
        ) : null}
      </header>
      <footer className={styles.footer}>
        <UserMenu />
        <div className={styles.credits}>
          <p>v7.0</p>
          <p>bland</p>
        </div>
        <a href="http://draftymedia.com" className="awesomes-logo">
          <img
            className={styles.dmLogo}
            src={require('drafty-logo.svg')}
            title="We are, we really are."
            alt="Drafty Media"
          />
        </a>
      </footer>
    </div>
  );
}

export default connect(state => ({
  vertical: state.verticals.selectedVertical,
  state,
}))(GlobalHeader);
