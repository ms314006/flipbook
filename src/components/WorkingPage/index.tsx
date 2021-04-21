import React from 'react';
import Flipbook from '../../class/Flipbook.ts';
import styles from './index.scss';

type WorkPageProps = {
  workPage: Flipbook;
  setPageColor: (color: string) => void;
}

export default (props: WorkPageProps) => {
  const { setPageColor, workPage } = props;

  return (
    <div className={styles.workspace}>
      <div
        role="button"
        tabIndex={0}
        className={styles.page}
        onClick={e => setPageColor(e.target.dataset.position)}
        onKeyDown={e => setPageColor(e.target.dataset.position)}
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
  );
};
