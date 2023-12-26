// //using Redux

// import { createStore } from "redux";
// import themeReducer from "./themeSlice";

// export const store = createStore(themeReducer);

import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";

export const store = configureStore({
  reducer: themeSlice,
});
