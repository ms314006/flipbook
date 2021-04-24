import React, { useEffect } from 'react';
import Palette from '../../class/Palette.ts';
import styles from './index.scss';

type ColorPickerProps = {
    currentColor: string;
    setCurrentColor: (color: string) => void
}

const palette = new Palette();

export default React.memo((props: ColorPickerProps) => {
  const { currentColor, setCurrentColor } = props;
  useEffect(() => {
    setCurrentColor(palette.colors[0]);
  }, []);

  const getColorWapperStyle = (color: string) => (
    color === currentColor ? styles.focusColorWapper : ''
  );
  return (
    <div className={styles.colors}>
      {
        palette.colors.map((color: string) => (
          <div
            key={color}
            className={`${styles.colorWapper} ${getColorWapperStyle(color)}`}
          >
            <div
              role="button"
              tabIndex={0}
              className={`${styles.colorButton} ${getColorWapperStyle(color)}`}
              style={{ background: color }}
              onClick={() => { setCurrentColor(color); }}
              onKeyDown={() => { setCurrentColor(color); }}
            />
          </div>
        ))
      }
    </div>
  );
});
