import React, { useState, useEffect } from 'react';
import ControlButtons from '../../components/ControlButtons';
import ColorPicker from '../../components/ColorPicker';
import WorkingPage from '../../components/WorkingPage';
import PageComponent from '../../components/Page';
import Flipbook from '../../class/Flipbook.ts';
import Page from '../../class/Page.ts';
import styles from './index.scss';

const flipbook = new Flipbook();

const Main = () => {
  const [currentColor, setCurrentColor] = useState();
  const [workingPage, setWorkingPage] = useState(new Page(flipbook.getPage()));
  const [showingPage, setShowingPage] = useState(new Page(flipbook.getPage()));
  const [pages, setPages] = useState(flipbook.pages);

  useEffect(() => {
    let currentPageNumber = 0;
    const showPageInterval = setInterval(() => {
      const pageCount = flipbook.getPageCount();
      setShowingPage(flipbook.getPage(currentPageNumber));
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
    flipbook.getPage(workingPage.pageNumber).setPositionColor(Number(x), Number(y), currentColor);
    setWorkingPage(new Page(flipbook.getPage(workingPage.pageNumber)));
    setPages(flipbook.pages);
  };

  return (
    <div className={styles.layout}>
      <div className={styles.main}>
        <ControlButtons
          flipbook={flipbook}
          setPages={setPages}
          workPage={workingPage}
          setWorkPage={setWorkingPage}
        />
        <ColorPicker
          currentColor={currentColor}
          setCurrentColor={setCurrentColor}
        />
        <WorkingPage
          workPage={workingPage}
          setPageColor={setPageColor}
        />
        <div className={styles.showFlipbook}>
          <div className={styles.page}>
            <PageComponent showPage={showingPage} />
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
                  `${styles.page} ${page.pageNumber === workingPage.pageNumber ? styles.focusPage : ''}`
                }
                onClick={() => setWorkingPage(page)}
                onKeyDown={() => setWorkingPage(page)}
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
