//node_modules
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

//styles
import { usenStyles } from "./style";

//stores
import { RootState } from "../../redux/store";
import { setLoginSuccess } from "../../redux/slices/user.slice";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = usenStyles();

  const { mail, pwd, api_Key } = useSelector((state: RootState) => state.user);

  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");

  const login = async () => {
    if (email === mail && pwd === password) {
      alert("success");
      const user = {
        email: mail,
        apiKey: api_Key,
      };
      dispatch(setLoginSuccess({ user: user, token: api_Key }));
      navigate("/");
      return;
    }
    alert("Login Failure");
  };

  return (
    <div className={classes.root}>
      <TextField
        label="Email"
        color="secondary"
        value={email}
        focused
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <TextField
        type="password"
        label="Password"
        color="secondary"
        value={password}
        focused
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <Button color="info" onClick={() => login()}>
        Login
      </Button>
    </div>
  );
};

export default SignIn;
