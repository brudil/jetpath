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

export default Sidebar;

function SidebarControl(props) {
  return (
    <div className={styles.control}>
      <h2 className={styles.controlTitle}>
        {props.title}
      </h2>
      {props.children}
    </div>
  );
}

SidebarControl.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export { SidebarControl };
