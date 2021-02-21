import React, { useState, useEffect } from 'react';
import Palette from '../../class/Palette';
import Flipbook from '../../class/Flipbook';
import styles from './index.scss';

const palette = new Palette();
const flipbook = new Flipbook();

const Main = () => {
  const [currentColor, setCurrentColor] = useState(palette.colors[0]);
  const rerender = useState({})[1];

  const setPageColor = (e) => {
    if (typeof e.target.dataset.position === 'undefined') return;
    const [x, y] = e.target.dataset.position.split('_');
    flipbook.getPage().setPositionColor(Number(x), Number(y), currentColor);
    rerender({});
  };

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
        <div className={styles.workspace}>
          <div
            role="button"
            tabIndex={0}
            className={styles.page}
            onClick={e => setPageColor(e)}
            onKeyDown={e => setPageColor(e)}
          >
            {
              Array.from(Array(flipbook.getPage().pageRowLength)).map((column, xIndex) => {
                const rowKey = xIndex;
                return (
                  <div key={rowKey} className={styles.pageRow}>
                    {
                      Array.from(Array(flipbook.getPage().pageColumnLength)).map((row, yIndex) => {
                        const color = flipbook.getPage().getPositionColor(xIndex, yIndex);
                        const gridKey = `${xIndex}_${yIndex}`;
                        return (
                          <div key={gridKey} className={styles.pageGridBorder}>
                            <div
                              data-position={gridKey}
                              className={styles.pageGrid}
                              style={{ background: color }}
                            />
                          </div>
                        );
                      })
                    }
                  </div>
                );
              })
            }
          </div>
        </div>
        <div className={styles.showFlipbook}>Show Flipbook</div>
        <div className={styles.pages}>Pages</div>
      </div>
    </div>
  );
};

export default Main;
