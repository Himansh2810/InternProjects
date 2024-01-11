const changeTheme = (th) => {
  return {
    type: "themeChanger",
    payload: th
  };
};

export default changeTheme;
