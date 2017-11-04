import React from 'react';
import cx from 'classnames';

import styles from './Sidebar.css';

function Sidebar(props: { children: React.ReactChildren }) {
  return <div className={styles.root}>{props.children}</div>;
}

export const SidebarInput = ({ className = '', ...props }) => (
  <input className={`${styles.input} ${className}`} {...props} />
);

export default Sidebar;

function SidebarControl({
  title,
  children,
  charLimit = null,
  charCount = null,
  buttonTreats = null,
}: {
  title: string;
  children: JSX.Element;
  charLimit?: number;
  charCount?: number;
  buttonTreats?: Array<Object>;
}) {

  const charCountStyles = (charLimit && charCount) ? {[styles.warning]: charCount > (charLimit * 0.8), [styles.danger]: charCount > charLimit,  } : {};
  return (
    <div className={styles.control}>
      <h2 className={styles.controlTitle}>
        {title}

        {charCount !== null ? (
          <span className={cx(styles.controlTitleLimit, charCountStyles)}>
            {charCount}
            {charLimit !== null ? `/${charLimit}` : null}
          </span>
        ) : null}

        {buttonTreats !== null ? (
          <ul className={styles.treats}>
            {buttonTreats.map(treat => (
              <li>
                <button className={styles.treatButton} {...treat} />
              </li>
            ))}
          </ul>
        ) : null}
      </h2>
      {children}
    </div>
  );
}

export { SidebarControl };
