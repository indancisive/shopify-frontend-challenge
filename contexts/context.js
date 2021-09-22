import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const [images, setImages] = useState();
    const [likedImages, setLikedImages] = useState();

    const store = {
        setImages,
        images,
        setLikedImages,
        likedImages,
    };

    return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};
