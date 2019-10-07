import axios from "axios";

export const LOGIN = "LOGIN";

export const loginAsync = async ({
  nick,
  password,
  dispatch
}: {
  nick: string;
  password: string;
  dispatch: (action: any) => void;
}) => {
  await axios.post(
    "http://localhost:5000/admins/login",
    { nick, password },
    { withCredentials: true }
  );
  dispatch({
    type: LOGIN,
    nick
  });
};

export const setLoggedIn = (nick: string, dispatch: any) => {
  dispatch({
    type: LOGIN,
    nick
  });
};

const initialState = { nick: "" };

const reducers = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        nick: action.nick
      };
    default:
      return state;
  }
};

export default reducers;
