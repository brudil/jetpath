import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import JetpathLogo from '../JetpathLogo';
import UserMenu from '../../components/UserMenu';
import verticals from '../../verticals';

import styles from './GlobalHeader.css';

function GlobalHeader(props) {
  const { vertical } = props;
  const verticalLinkTo = part => `/@${vertical.identifier}/${part}`;

  if (!vertical) {
    return null;
  }

  return (
    <div className={cx(styles.root, styles[`vertical_${vertical.identifier}`])}>
      <header className={styles.header}>
        <h1 className={styles.logoHeading}>
          {vertical
            ? <Link to="/">
                <JetpathLogo />
                <span className={styles.verticalJoiner}>+</span>
                <img
                  className={styles.verticalLogo}
                  src={verticals[vertical.identifier].logoHeader}
                  alt={vertical.name}
                />
              </Link>
            : <Link to="/">
                <JetpathLogo />
              </Link>}
        </h1>
        {vertical
          ? <menu className={styles.menu}>
              <ul>
                <li className={styles.menuItem}>
                  <Link to={verticalLinkTo('content')}>
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
          : null}
      </header>
      <footer className={styles.footer}>
        <UserMenu />
        <div className={styles.credits}>
          <p>v6.0</p>
          <p>pablo</p>
        </div>
        <a href="http://draftymedia.com" className="awesomes-logo">
          <img
            className={styles.dmLogo}
            src={require('drafty-logo.svg')} // eslint-disable-line
            title="We are, we really are."
            alt="Drafty Media"
          />
        </a>
      </footer>
    </div>
  );
}

GlobalHeader.propTypes = {
  vertical: PropTypes.string,
};

export default connect(state => ({
  vertical: state.verticals.selectedVertical,
  state,
}))(GlobalHeader);
