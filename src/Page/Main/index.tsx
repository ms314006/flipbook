import React from 'react';
import styles from './index.scss';

const Main = () => (
  <div className={styles.layout}>
    <div className={styles.main}>
      <div className={styles.colors}>Colors</div>
      <div className={styles.workspace}>Workspace</div>
      <div className={styles.showFlipbook}>Show Flipbook</div>
      <div className={styles.pages}>Pages</div>
    </div>
  </div>
);

export default Main;
