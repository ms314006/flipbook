import React from 'react';
import { FlipbookInterface } from '../../class/Flipbook.ts';
import { PageInterface } from '../../class/Page.ts';
import styles from './index.scss';

type ControlButtonsProps = {
    flipbook: FlipbookInterface;
    workingPage: PageInterface;
    setWorkingPage: (page: PageInterface) => void;
    setPages: (pages: PageInterface[]) => void
}

export default React.memo((props: ControlButtonsProps) => {
  const {
    flipbook, workingPage, setWorkingPage, setPages,
  } = props;

  const addNewPage = () => {
    flipbook.addNewPage(workingPage.pageNumber);
    setPages(flipbook.pages);
  };

  const deleteWorkPage = () => {
    const deletePageNumber = workingPage.pageNumber;
    const nextWorkPageNumber = workingPage.pageNumber === 0 ? 0 : workingPage.pageNumber - 1;
    flipbook.deletePage(deletePageNumber);
    setWorkingPage(flipbook.getPage(nextWorkPageNumber));
    setPages(flipbook.pages);
  };

  const pastePage = () => {
    flipbook.pastePage(workingPage.pageNumber);
    setWorkingPage(flipbook.getPage(workingPage.pageNumber));
    setPages(flipbook.pages);
  };
  return (
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
        onClick={() => { flipbook.copyPage(workingPage.pageNumber); }}
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
  );
}, (prevProps, nextProps) => (
  prevProps.workingPage.pageNumber === nextProps.workingPage.pageNumber
));
