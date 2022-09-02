import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//stores
import { RootState } from "../../redux/store";
import { getMe } from "../../redux/slices/user.slice";
import { setLoading } from "../../redux/slices/loading.slice";

const SignUp = () => {
  const dispatch = useDispatch();

  const { user, token } = useSelector((state: RootState) => state.user);
  
  useEffect(() => {
    console.log("sign in");
  }, []);

  return (
    <div>
      Signup
    </div>
  );
};

export default SignUp;
