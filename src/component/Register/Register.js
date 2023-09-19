import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./Register.module.css";

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    mobileNum: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    name: null,
    mobileNum: null,
    email: null,
    password: null,
  });

  const handleName = (e) => {
    let input = { ...data };
    input.name = e.target.value;
    setData(input);
  };

  const hanldeMobileNumber = (e) => {
    let input = { ...data };
    input.mobileNum = e.target.value;
    setData(input);
  };

  const handleEmail = (e) => {
    let input = { ...data };
    input.email = e.target.value;
    setData(input);
  };

  const handlePassword = (e) => {
    let input = { ...data };
    input.password = e.target.value;
    setData(input);
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    let name = data.name.trim();
    let mobileNum = data.mobileNum.trim();
    let password = data.password.trim();

    let users = getData();
    const currentUser = users.find((local) => (+(local.mobileNum) == +(data.mobileNum)) );

    if(!currentUser){
      if (!name || name.length < 2) {
        function handleErrorName() {
          let input = { ...error };
          input.name = "Please Enter a name of atleast 2 characters.";
          setError(input);
        }
        handleErrorName();
      } else if (!mobileNum || (+mobileNum < 1000000000 || +mobileNum > 9999999999)) {
        function handleErrorMobileNum() {
          let input = { ...error };
          input.mobileNum = "Please Enter a Valid Number.";
          input.name = null;
          setError(input);
        }
        handleErrorMobileNum();
      }
      else if(!password || password.length < 6){
        function handleErrorpassword() {
          let input = { ...error };
          input.password = "Password must contain 6 digits/Characters";
          input.mobileNum = null;
          input.name = null;
          setError(input);
        }
        handleErrorpassword();
      }
      else {
        alert("registeration success");
        users.push(data);
        localStorage.setItem("users", JSON.stringify(users));        
        let input = { ...error };
        input.name = null;
        input.mobileNum = null;
        input.email = null;
        input.password = null;
        setError(input);
        navigate("/login")
      }
    }
    else if(currentUser.email == data.email){
      alert("Email Exist");
    }
    else if(+(currentUser.mobileNum) == +(data.mobileNum)){
      alert("Mobile Num exist");
    }
    
  };

  return (
    <div className={Styles.RegisterMain}>
      {/* Logo  */}
      <div>
        <img
          style={{ cursor: "pointer", width: 80, height: 25, marginTop: 10 }}
          // className={Styles.image}
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="AMAZON"
          onClick={() => navigate("/")}
        />
      </div>

      {/* Box  */}
      <div className={Styles.registerBox}>
        <p className={Styles.registerTitle}>Create Account</p>
        <form action="submit" onSubmit={(e) => handleSubmit(e)}>
          <label name="name">Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="First and last name"
            value={data.name}
            onChange={(e) => handleName(e)}
            required
          />
          <p className={Styles.ErrorMsg}>{error.name}</p>
          <br />
          <label name="number">Mobile Number</label>
          <input
            type="tel"
            name="number"
            placeholder="Mobile Number"
            value={data.mobileNum}
            onChange={(e) => hanldeMobileNumber(e)}
            required
          />
          <p style={{ top: "92px" }} className={Styles.ErrorMsg}>
            {error.mobileNum}
          </p>
          <br />
          <label name="email">Email (optional)</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={(e) => handleEmail(e)}
            required
          />
          <br />
          <label name="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="At least 6 characters"
            value={data.password}
            onChange={(e) => handlePassword(e)}
            required
          />
          <p style={{ top: "203px" }} className={Styles.ErrorMsg}>
            {error.password}
          </p>
          <br />
          <span>
            To verify your number, we will send you a text message with a
            temporary code. Message and data rates may apply.
          </span>
          <br />
          <input
            className={Styles.registerFormButton}
            type="submit"
            value="Sign up"
          />
        </form>
        <hr />

        <p className={Styles.HaveAccount}>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Sign in</span>
        </p>

        <p className={Styles.HaveAccount}>
          By creating an account or logging in, you agree to Amazon’s{" "}
          <a href="#"> Conditions of Use </a>and <a href="#">Privacy Policy</a>{" "}
          .
        </p>
      </div>

      {/* footer  */}
      <div
        style={{
          width: "100vw",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "-22px",
          height: "170px",
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

export default Register;
