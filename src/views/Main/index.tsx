import React, { useState, useEffect } from 'react';
import ControlButtons from '../../components/ControlButtons';
import ColorPicker from '../../components/ColorPicker';
import WorkPage from '../../components/WorkPage';
import PageComponent from '../../components/Page';
import Flipbook from '../../class/Flipbook.ts';
import Page from '../../class/Page.ts';
import styles from './index.scss';

const flipbook = new Flipbook();

const Main = () => {
  const [currentColor, setCurrentColor] = useState();
  const [workPage, setWorkPage] = useState(new Page(flipbook.getPage()));
  const [showPage, setShowPage] = useState(new Page(flipbook.getPage()));
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

  const setPageColor = (position: string) => {
    if (typeof position === 'undefined') return;
    const [x, y] = position.split('_');
    flipbook.getPage(workPage.pageNumber).setPositionColor(Number(x), Number(y), currentColor);
    setWorkPage(new Page(flipbook.getPage(workPage.pageNumber)));
    setPages(flipbook.pages);
  };

  return (
    <div className={styles.layout}>
      <div className={styles.main}>
        <ControlButtons
          flipbook={flipbook}
          setPages={setPages}
          workPage={workPage}
          setWorkPage={setWorkPage}
        />
        <ColorPicker
          currentColor={currentColor}
          setCurrentColor={setCurrentColor}
        />
        <WorkPage
          workPage={workPage}
          setPageColor={setPageColor}
        />
        <div className={styles.showFlipbook}>
          <div className={styles.page}>
            <PageComponent showPage={showPage} />
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
                <PageComponent showPage={page} gridSize={4} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Main;
