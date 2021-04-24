import React from 'react';
import Flipbook from '../../class/Flipbook.ts';
import styles from './index.scss';

type WorkingPageProps = {
  workingPage: Flipbook;
  setPageColor: (color: string) => void;
}

export default React.memo((props: WorkingPageProps) => {
  const { setPageColor, workingPage } = props;

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
          Array.from(Array(workingPage.pageRowLength)).map((column, xIndex) => {
            const rowKey = xIndex;
            return (
              <div key={rowKey} className={styles.pageRow}>
                {
                  Array.from(Array(workingPage.pageColumnLength)).map((row, yIndex) => {
                    const color = workingPage.getPositionColor(xIndex, yIndex);
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
}, (prevProps, nextProps) => (
  JSON.stringify(prevProps.workingPage) === JSON.stringify(nextProps.workingPage)
  && prevProps.setPageColor === nextProps.setPageColor
));
