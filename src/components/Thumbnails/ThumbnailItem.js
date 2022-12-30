import clsx from "clsx";
import styles from "./Thumbnails.module.scss";
import { useMemo } from "react";

import { useAppContext } from "../../App.context";

export const ThumbnailItem = ({ img, index, params }) => {
  const { selectedThumbnails, selectImage } = useAppContext();

  const isSelected = useMemo(
    () => selectedThumbnails.has(img),
    [selectedThumbnails]
  );

  const handleSelection = (e) => {
    selectImage(e, img);
  };

  return (
    <div
      className={clsx(styles.item, isSelected && styles["item--selected"])}
      onClick={handleSelection}
    >
      {isSelected && (
        <div className={styles.badge}>
          <div className={styles.check} />
        </div>
      )}
      <img src={`${img}?${params}`} alt={img} className={styles.img} />
    </div>
  );
};
