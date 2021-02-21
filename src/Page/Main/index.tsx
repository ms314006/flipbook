import React, { useState } from 'react';
import Palette from '../../Class/Palette';
import styles from './index.scss';

const Main = () => {
  const palette = new Palette();
  const [currentColor, setCurrentColor] = useState(palette.colors[0]);

  return (
    <div className={styles.layout}>
      <div className={styles.main}>
        <div className={styles.actionBtns}>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={() => { console.log('new'); }}
          >
            new
          </button>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={() => { console.log('new'); }}
          >
            add
          </button>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={() => { console.log('new'); }}
          >
            delete
          </button>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={() => { console.log('new'); }}
          >
            copy
          </button>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={() => { console.log('new'); }}
          >
            paste
          </button>
        </div>
        <div className={styles.colors}>
          {
            palette.colors.map(color => (
              <div
                key={color}
                className={`${styles.colorWapper} ${color === currentColor ? styles.focusColorWapper : ''}`}
              >
                <div
                  role="button"
                  tabIndex={0}
                  className={`${styles.colorButton} ${color === currentColor ? styles.focusColorButton : ''}`}
                  style={{ background: color }}
                  onClick={() => { setCurrentColor(color); }}
                  onKeyDown={() => { setCurrentColor(color); }}
                />
              </div>
            ))
          }
        </div>
        <div className={styles.workspace}>Workspace</div>
        <div className={styles.showFlipbook}>Show Flipbook</div>
        <div className={styles.pages}>Pages</div>
      </div>
    </div>
  );
};

export default Main;
