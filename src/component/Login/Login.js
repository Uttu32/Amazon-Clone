import React, { useState } from "react";
import Styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isUserLogged } from "../../Recoil/Atom";

export default function Login() {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useRecoilState(isUserLogged);
  const [mobileNum, setMobileNum] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    mobileNum: null,
    password: null,
  });

  function getData() {
    const users = localStorage.getItem("users");
    if (users) {
      try {
        return JSON.parse(users);
      } catch {
        return [];
      }
    }
    return [];
  }

  function handleLogin(e) {
    e.preventDefault();
    let userData = getData();
    if(!mobileNum || +(mobileNum) < 1000000000){
      function handleErrorMobileNum() {
        let input = { ...error };
        input.mobileNum = "Please Enter a Valid Mobile Number.";
        setError(input);
      }
      handleErrorMobileNum();
    }
    const currentUser = userData.find((data) => +(data.mobileNum) == +(mobileNum));
    if(!currentUser){
      alert("User Not Found");
    }
    else if(currentUser.password != password){
      function handleErrorpassword() {
        let input = { ...error };
        input.password = "Password doesn't Match";
        input.mobileNum = null;
        setError(input);
      }
      handleErrorpassword();
    }
    else if(currentUser.password === password){
      alert("Login Successful");
      currentUser.isLoggedIn = true;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      setIsUserLoggedIn(true);
      navigate("/");
    }
  }

  return (
    <div className={Styles.LoginMain}>
      {/* logo */}
      <div>
        <img
          style={{ cursor: "pointer", width: 80, height: 25, marginTop: 10 }}
          className={Styles.image}
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="AMAZON"
          onClick={() => navigate("/")}
        />
      </div>

      {/* Box having input options */}
      <div className={Styles.LoginBox}>
        <p>Sign in</p>
        <form action="submit">
          <label name="number">Enter mobile phone number</label>
          <input
            type="text"
            name="number"
            inputMode="numeric"
            onChange={(e) => setMobileNum(e.target.value)}
            required
          />
          <p style={{ top: "175px" }} className={Styles.ErrorMsg}>
            {error.mobileNum}
          </p>
          <br />
          <label name="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p style={{ top: "230px" }} className={Styles.ErrorMsg}>
            {error.password}
          </p>
          <br />
          <input
            className={Styles.LoginFormButton}
            type="submit"
            value="Sign in"
            onClick={(e)=>handleLogin(e)}
          />
        </form>
        <span>
          By continuing, you agree to Amazon's{" "}
          <a href="#"> Conditions of Use </a>and<a href="#">Privacy Notice</a> .
        </span>
      </div>
      {/* divider */}
      <div className={Styles.LoginDivider}>
        <div className={Styles.FirstLine}>
          <hr />
        </div>
        <p>New to Amazon?</p>
        <div className={Styles.LastLine}>
          <hr />
        </div>
      </div>

      {/* Create new Account Button  */}
      <div className={Styles.LoginButton} onClick={() => navigate("/register")}>
        Create Your Amazon Account
      </div>
      <div style={{ width: "100vw" }}>
        <hr />
      </div>
      {/* Last div  */}
      <div
        style={{
          width: "100vw",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "-22px",
          height: "284px",
          gap: "10px",
          backgroundColor: "rgba(245, 245, 245, 0.48)",
        }}
      >
        <div className={Styles.SpanFooter}>
          <a href="#">Conditions of Use</a>
          <a href="#">Privacy Notice</a>
          <a href="#">Help</a>
        </div>
        <p className={Styles.Foot}>
          &copy; 1996-2023, Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
}
