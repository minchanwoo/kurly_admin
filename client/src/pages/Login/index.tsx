import React, { useState, useEffect } from "react";
import { Button, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useDispatch } from "react-redux";
import { loginAsync, setLoggedIn } from "../../reducers";
import Axios from "axios";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: "100%",
    padding: "0 30px"
  }
});

const Login = (props: any) => {
  const classes = useStyles();

  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    Axios.post(
      "http://localhost:5000/admins/check_loggedin",
      {},
      { withCredentials: true }
    ).then(result => {
      if (result.data.nick) {
        setLoggedIn(result.data.nick, dispatch);
      }
    });
  }, []);

  return (
    <div className={classes.root}>
      <Input
        type="text"
        placeholder="아이디"
        onChange={e => setNick(e.target.value)}
      />
      <br />
      <br />
      <Input
        type="password"
        placeholder="비밀번호"
        onChange={e => setPassword(e.target.value)}
      />
      <br />
      <br />
      <Button
        variant="contained"
        color="secondary"
        type="submit"
        onClick={async e => {
          e.preventDefault();

          await loginAsync({ nick, password, dispatch });
          props.history.push("/");
        }}
      >
        로그인
      </Button>
    </div>
  );
};

export default Login;
