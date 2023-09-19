import React, { useEffect, useState } from "react";
import Styles from "./Home.module.css";
import Header from "../component/Header";
import Body from "../component/Body";
import CaraousalComponent from "../component/CaraousalComponent";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isUserLogged } from "../Recoil/Atom";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isUserLogged);
  const navigate = useNavigate();

  function getCurrentUser() {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      try {
        return JSON.parse(currentUser);
      } catch {
        return [];
      }
    }
    return [];
  }
  
  useEffect(() => {
    const currentUser = getCurrentUser();
    setIsLoggedIn(currentUser.isLoggedIn);
    console.log(isLoggedIn);
    if(isLoggedIn === false || isLoggedIn === undefined){
      navigate("/login");
    }
    else if(isLoggedIn === true){
      navigate("/");
    }
  }, [isLoggedIn]);
  return (
    <div className={Styles.App}>
      <Header />

      <CaraousalComponent />
      <Body />
    </div>
  );
}
