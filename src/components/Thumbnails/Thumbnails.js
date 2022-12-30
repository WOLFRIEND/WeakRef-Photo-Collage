import { ThumbnailItem } from "./ThumbnailItem";
import styles from "./Thumbnails.module.scss";

import { THUMBNAIL_PARAMS } from "../../constants";

export const Thumbnails = ({ images }) => {
  return (
    <div className={styles.container}>
      {images.map((item, index) => (
        <ThumbnailItem
          key={item.img}
          {...item}
          params={THUMBNAIL_PARAMS}
          index={index}
        />
      ))}
    </div>
  );
};
