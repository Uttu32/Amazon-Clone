import React from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./LogOut.module.css";
import { useRecoilState } from "recoil";
import { isUserLogged } from "../../Recoil/Atom";

export default function LogOut() {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useRecoilState(isUserLogged);

  function handleLogOut() {
    localStorage.removeItem("currentUser");
    setIsUserLoggedIn(false);
    navigate("/");
  }

  return (
    <div className={Styles.LogoutMain}>
      <div>
        <img
          style={{ cursor: "pointer", width: 80, height: 25, marginTop: 10 }}
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="AMAZON"
          onClick={() => navigate("/")}
        />
      </div>
      <div className={Styles.LogoutBox}>
        <h2>Do You Want to Logout ?</h2>
        <button onClick={handleLogOut}>Yes</button>
        <br />
        <button onClick={() => navigate("/")}>No</button>
      </div>
    </div>
  );
}
