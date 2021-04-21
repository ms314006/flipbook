import React from 'react';
import Page from '../../class/Page.ts';

type PageProps = {
  showPage: Page;
  gridSize?: number;
}

export default (props: PageProps) => {
  const { showPage, gridSize = 8 } = props;
  return (
    <>
      {
        Array.from(Array(showPage.pageRowLength)).map((column, xIndex) => {
          const rowKey = xIndex;
          return (
            <div key={rowKey}>
              {
                Array.from(Array(showPage.pageColumnLength)).map((row, yIndex) => {
                  const color = showPage.getPositionColor(xIndex, yIndex);
                  const gridKey = `${xIndex}_${yIndex}`;
                  return (
                    <div
                      key={gridKey}
                      style={{ background: color, height: gridSize, width: gridSize }}
                    />
                  );
                })
              }
            </div>
          );
        })
      }
    </>
  );
};
