//using Redux

// const changeTheme = (th) => {
//   return {
//     type: "themeChanger",
//     payload: th,
//   };
// };

// function themeReducer(state = { thColor: "light" }, action) {
//   switch (action.type) {
//     case "themeChanger":
//       return { thColor: action.payload };

//     default:
//       return state;
//   }
// }

// export { changeTheme };
// export default themeReducer;

// using Redux-toolkit

import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    thColor: "light",
  },
  reducers: {
    changeTheme: (state, action) => {
      state.thColor = action.payload;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
