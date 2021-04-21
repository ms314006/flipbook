import React from 'react';
import Flipbook from '../../class/Flipbook.ts';
import Page from '../../class/Page.ts';
import styles from './index.scss';

type ControlButtonsProps = {
    flipbook: Flipbook;
    workPage: Flipbook;
    setWorkPage: (page: Page) => void;
    setPages: (pages: Page[]) => void
}

export default (props: ControlButtonsProps) => {
  const {
    flipbook, workPage, setWorkPage, setPages,
  } = props;

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
  );
};
