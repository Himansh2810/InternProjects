const initialValue = {
  username: "",
  name: "",
};

function userReducer(state = { user: initialValue }, action) {
  switch (action.type) {
    case "set-user":
      return { user: action.payload };

    default:
      return state;
  }
}

export default userReducer;
