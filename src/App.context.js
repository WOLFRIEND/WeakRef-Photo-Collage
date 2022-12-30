import React, { createContext, useContext, useMemo, useState } from "react";
import { LAYOUTS } from "./constants";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [selectedThumbnails, setSelectedThumbnails] = useState(new Map());
  const [currentLayout, setCurrentLayout] = useState(LAYOUTS[0]);

  const selectImage = (e, img) => {
    selectedThumbnails.has(img)
      ? setSelectedThumbnails((prevState) => {
          prevState.delete(String(img));
          return new Map(prevState);
        })
      : setSelectedThumbnails(
          new Map(selectedThumbnails.set(String(img), img))
        );
  };

  const selectedImagesSize = useMemo(() => {
    return selectedThumbnails.size;
  }, [selectedThumbnails.size, selectedThumbnails]);

  const context = {
    selectedThumbnails,
    setSelectedThumbnails,
    selectImage,
    selectedImagesSize,
    currentLayout,
    setCurrentLayout,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
