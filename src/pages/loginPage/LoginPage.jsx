import React, { useLayoutEffect, useEffect, useState } from "react";
import "./loginStyle.css";
import { get, post } from "../../servises/http";
import { useAuthDispatch, useAuthState } from "../../contexts/authContext";
import Loading from "../../components/loading/Loading";
import { actionTypes, useAuthActions } from "../../contexts/reducer";
import { useLocation, useNavigate } from "react-router-dom";
// import logo from "../../assets/images/logo.png";
import { Alert, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage({}) {
  const [useName, setUseName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const [userInfos, setUserInfos] = useState(null);
  const { loading } = useAuthState() || {};
  const dispatch = useAuthDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { from } = location.state || { from: { pathname: "/" } };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch({
      type: actionTypes.LOGIN_REQUEST,
    });
    post(
      "/api/Administration/AdminUser/Login",
      {
        username: `${useName}`,
        password: `${password}`,
      },
      token
    )
      .then((response) => {
        setToken(response.tokenValue);
        setUserInfos(response.userData);
        toast.success(response.message);
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.message);
        } else {
          toast.error("An unexpected error occurred.");
        }
        dispatch({
          type: actionTypes.LOGIN_ERROR,
          payload: {
            error: errorMessage,
          },
        });
      });
  };
  
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userInfos));
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: {
          user: userInfos,
          token: token,
        },
      });
      navigate(from);
    }
  }, [token, userInfos, dispatch]);

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      dispatch({
        type: actionTypes.LOGIN_REQUEST,
      });
      setToken(token);
      setUserInfos(JSON.parse(user));
    }
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="login">
          <div class="background">
            <div class="shape"></div>
            <div class="shape"></div>
          </div>
          <form onSubmit={handleLogin}>
            <h3>LOGO</h3>
            {/* <div className="login-main">
                 <img className="mx-auto logo w[20%]" src={logo} alt="logo" />
               </div> */}
            <label for="username">نام کاربری</label>
            <input
              type="text"
              name="userName"
              required={true}
              onChange={(e) => setUseName(e.target.value)}
              labelText="نام کاربری"
              placeholder="نام کاربری"
            />

            <label for="password">رمز عبور</label>
            <input
              type="password"
              name="password"
              required={true}
              onChange={(e) => setPassword(e.target.value)}
              labelText="رمز عبور"
              placeholder="رمز عبور"
            />

            <button type="submit">ورود</button>
          </form>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
