import styles from "./Preview.module.scss";
import clsx from "clsx";
import { useAppContext } from "../../App.context";
import { loadImage, weakCache, createImageFile } from "../../utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LAYOUTS } from "../../constants";

export const Preview = () => {
  const [loading, setLoading] = useState(false);
  const [collageRendered, setCollageRendered] = useState(false);

  const {
    selectedThumbnails,
    setSelectedThumbnails,
    currentLayout,
    setCurrentLayout,
  } = useAppContext();

  const getImageCached = useRef(null);
  const canvas = useRef(null);

  useEffect(() => {
    (async () => {
      getImageCached.current = await weakCache(loadImage);
    })();
  }, []);

  const createCollage = async () => {
    setLoading(true);

    const images = [];

    for (const thumbnail of selectedThumbnails.values()) {
      const blobImage = await getImageCached.current(thumbnail);

      const url = URL.createObjectURL(blobImage);
      const img = await createImageFile(url);

      images.push(img);
      URL.revokeObjectURL(url);
    }

    drawCollage(images);
  };

  const drawCollage = (images) => {
    let context = canvas.current.getContext("2d");

    /**
     * Calculate canvas dimensions based on the current layout.
     * */
    context.canvas.width = currentLayout.itemWidth * currentLayout.columns;
    context.canvas.height =
      calculateGridRows(images.length) * currentLayout.itemHeight;

    let currentRow = 0;
    let currentCanvasDx = 0;
    let currentCanvasDy = 0;

    for (let i = 0; i < images.length; i++) {
      /**
       * Get current row of the collage.
       * */
      if (i % currentLayout.columns === 0) {
        currentRow += 1;
        currentCanvasDx = 0;

        if (currentRow > 1) {
          currentCanvasDy += currentLayout.itemHeight;
        }
      }

      context.drawImage(
        images[i],
        0,
        0,
        images[i].width,
        images[i].height,
        currentCanvasDx,
        currentCanvasDy,
        currentLayout.itemWidth,
        currentLayout.itemHeight
      );

      currentCanvasDx += currentLayout.itemWidth;
    }

    setLoading(false);
    setCollageRendered(true);
  };

  /**
   * Clear all settled data to start over.
   * */
  const startOver = () => {
    setSelectedThumbnails(new Map());
    setCollageRendered(false);
    const context = canvas.current.getContext("2d");
    context.clearRect(0, 0, canvas.current.width, canvas.current.height);
  };

  const changeLayout = ({ target }) => {
    setCurrentLayout(JSON.parse(target.value));
  };

  const calculateGridRows = (blobsLength) =>
    Math.ceil(blobsLength / currentLayout.columns);

  const downloadCollage = () => {
    const date = new Date();
    const fileName = `Collage-${date.getDay()}-${date.getMonth()}-${date.getFullYear()}.png`;
    const img = canvas.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = fileName;
    link.href = img;
    link.click();
    link.remove();
  };

  return (
    <>
      <div className={styles.actions}>
        <select
          disabled={loading}
          onChange={changeLayout}
          className={styles.select}
        >
          {LAYOUTS.map((layout, index) => (
            <option key={layout.name} value={JSON.stringify(layout)}>
              {layout.name}
            </option>
          ))}
        </select>
        <button
          disabled={!selectedThumbnails.size || loading}
          className={clsx(styles.btn, styles["btn--primary"])}
          onClick={createCollage}
        >
          Create collage
        </button>
        <button
          onClick={startOver}
          className={clsx(styles.btn, styles["btn--secondary"])}
          disabled={loading}
        >
          Start over
        </button>
        <button
          disabled={!collageRendered || loading}
          className={clsx(styles.btn, styles["btn--success"])}
          onClick={downloadCollage}
        >
          Download
        </button>
      </div>

      <div className={styles.previewContainer}>
        {loading && <div className={styles.spinner}></div>}
        <canvas
          ref={canvas}
          className={clsx(styles.canvas, !loading && styles["canvas--ready"])}
        ></canvas>
      </div>
    </>
  );
};
