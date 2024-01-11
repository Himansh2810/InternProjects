const initialState = {
  user: {
    name: "",
    created_at: "",
    username: ""
  }
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case "set-user":
      return { user: action.payload };

    default:
      return state;
  }
}

export default userReducer;
