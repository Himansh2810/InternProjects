function themeReducer(state = { thColor: "light" }, action) {
  switch (action.type) {
    case "themeChanger":
      return { thColor: action.payload };

    default:
      return state;
  }
}

export default themeReducer;
