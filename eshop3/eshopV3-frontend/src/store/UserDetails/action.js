const setUser = (user) => {
  return {
    type: "set-user",
    payload: user
  };
};

export default setUser;
