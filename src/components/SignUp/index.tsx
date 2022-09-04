//node_modules
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

//styles
import { usenStyles } from "./style";

//stores
import { RootState } from "../../redux/store";
import { getApiKey, setUserSuccess } from "../../redux/slices/user.slice";
// import { setLoading } from "../../redux/slices/loading.slice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = usenStyles();

  const [apiKey, setApiKey] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");

  const { api_Key, mail, pwd } = useSelector((state: RootState) => state.user);

  const getKey = async () => {
    dispatch(getApiKey({}));
  };

  const register = async () => {
    if (!email || !password || !apiKey) {
      alert("Invalid parameter");
      return;
    }
    dispatch(setUserSuccess({ email: email, password: password }));
    navigate("/login");
  };
  useEffect(() => {
    setApiKey(api_Key);
  }, [api_Key]);

  useEffect(() => {
    if (mail && pwd) {
      // console.log("email, pass: ", mail, password);
    }
  }, [pwd, mail]);

  return (
    <div className={classes.root}>
      <div className={classes.apiDiv}>
        <TextField
          label="ApiKey"
          color="secondary"
          value={apiKey}
          focused
          disabled
          required
          className={classes.apiKey}
          onChange={(e) => {
            setApiKey(e.target.value);
          }}
        />
        <Button
          color="info"
          size="large"
          onClick={() => {
            getKey();
          }}
        >
          Get API_KEY
        </Button>
      </div>
      <br />
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
      <Button color="info" onClick={() => register()}>
        Register
      </Button>
    </div>
  );
};

export default SignUp;
