import React, { useState, useEffect } from 'react';
import Palette from '../../class/Palette';
import Flipbook from '../../class/Flipbook';
import styles from './index.scss';

const palette = new Palette();
const flipbook = new Flipbook();

const Main = () => {
  const [currentColor, setCurrentColor] = useState(palette.colors[0]);
  const [workPage, setWorkPage] = useState(flipbook.getPage());
  const [showPage, setShowPage] = useState(flipbook.getPage());
  const [pages, setPages] = useState(flipbook.pages);

  useEffect(() => {
    let currentPageNumber = 0;
    const showPageInterval = setInterval(() => {
      const pageCount = flipbook.getPageCount();
      setShowPage(flipbook.getPage(currentPageNumber));
      if (currentPageNumber === pageCount - 1) {
        currentPageNumber = 0;
      } else {
        currentPageNumber += 1;
      }
    }, 100);

    return () => {
      clearInterval(showPageInterval);
    };
  }, [pages]);

  const setPageColor = (e) => {
    if (typeof e.target.dataset.position === 'undefined') return;
    const [x, y] = e.target.dataset.position.split('_');
    flipbook.getPage(workPage.pageNumber).setPositionColor(Number(x), Number(y), currentColor);
    setWorkPage(flipbook.getPage(workPage.pageNumber));
    setPages(flipbook.pages);
  };

  const addNewPage = () => {
    flipbook.addNewPage(workPage.pageNumber);
    setPages(flipbook.pages);
  };

  const deleteWorkPage = () => {
    const deletePageNumber = workPage.pageNumber;
    const nextWorkPageNumber = workPage.pageNumber === 0 ? 0 : workPage.pageNumber - 1;
    flipbook.deletePage(deletePageNumber);
    setWorkPage(flipbook.getPage(nextWorkPageNumber));
    setPages(flipbook.pages);
  };

  const pastePage = () => {
    flipbook.pastePage(workPage.pageNumber);
    setWorkPage(flipbook.getPage(workPage.pageNumber));
    setPages(flipbook.pages);
  };

  return (
    <div className={styles.layout}>
      <div className={styles.main}>
        <div className={styles.actionBtns}>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={addNewPage}
          >
            add
          </button>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={deleteWorkPage}
          >
            delete
          </button>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={() => { flipbook.copyPage(workPage.pageNumber); }}
          >
            copy
          </button>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={pastePage}
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
              Array.from(Array(workPage.pageRowLength)).map((column, xIndex) => {
                const rowKey = xIndex;
                return (
                  <div key={rowKey} className={styles.pageRow}>
                    {
                      Array.from(Array(workPage.pageColumnLength)).map((row, yIndex) => {
                        const color = workPage.getPositionColor(xIndex, yIndex);
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
        <div className={styles.showFlipbook}>
          <div className={styles.page}>
            {
              Array.from(Array(showPage.pageRowLength)).map((column, xIndex) => {
                const rowKey = xIndex;
                return (
                  <div key={rowKey} className={styles.pageRow}>
                    {
                      Array.from(Array(showPage.pageColumnLength)).map((row, yIndex) => {
                        const color = showPage.getPositionColor(xIndex, yIndex);
                        const gridKey = `${xIndex}_${yIndex}`;
                        return (
                          <div
                            key={gridKey}
                            className={styles.pageGrid}
                            style={{ background: color }}
                          />
                        );
                      })
                    }
                  </div>
                );
              })
            }
          </div>
        </div>
        <div className={styles.pages}>
          {
            pages.map(page => (
              <div
                role="button"
                tabIndex={0}
                key={page.pageNumber}
                className={
                  `${styles.page} ${page.pageNumber === workPage.pageNumber ? styles.focusPage : ''}`
                }
                onClick={() => setWorkPage(page)}
                onKeyDown={() => setWorkPage(page)}
              >
                {
                  Array.from(Array(page.pageRowLength)).map((column, xIndex) => {
                    const rowKey = xIndex;
                    return (
                      <div key={rowKey} className={styles.pageRow}>
                        {
                          Array.from(Array(page.pageColumnLength)).map((row, yIndex) => {
                            const color = page.getPositionColor(xIndex, yIndex);
                            const gridKey = `${xIndex}_${yIndex}`;
                            return (
                              <div
                                key={gridKey}
                                className={styles.pageGrid}
                                style={{ background: color }}
                              />
                            );
                          })
                        }
                      </div>
                    );
                  })
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Main;
