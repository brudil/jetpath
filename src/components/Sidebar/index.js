import PropTypes from 'prop-types';
import React from 'react';

import styles from './Sidebar.css';

function Sidebar(props) {
  return (
    <div className={styles.root}>
      {props.children}
    </div>
  );
}

Sidebar.propTypes = {
  children: PropTypes.node,
};

Sidebar.Input = ({ className = '', ...props }) =>
  <input className={`${styles.input} ${className}`} {...props} />;

export default Sidebar;

function SidebarControl({
  title,
  children,
  charLimit = null,
  charCount = null,
  buttonTreats = null,
}) {
  return (
    <div className={styles.control}>
      <h2 className={styles.controlTitle}>
        {title}

        {charCount !== null
          ? <span className={styles.controlTitleLimit}>
              {charCount}
              {charLimit !== null ? `/${charLimit}` : null}
            </span>
          : null}

        {buttonTreats !== null
          ? <ul className={styles.treats}>
              {buttonTreats.map(treat =>
                <li>
                  <button className={styles.treatButton} {...treat} />
                </li>
              )}
            </ul>
          : null}
      </h2>
      {children}
    </div>
  );
}

SidebarControl.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  charLimit: PropTypes.number,
  charCount: PropTypes.number,
};

export { SidebarControl };
