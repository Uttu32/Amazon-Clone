import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Styles from "./Header.module.css";
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Header() {

  const cart = useSelector((state) => state.cart.cart);
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

  const currentUser = getCurrentUser();

  const [data, setData] = useState(currentUser);

  


  return (
    <>
      <div className={Styles.header}>
        {/* Image or logo will be at left */}
        <div>
          <img
            style={{ cursor:'pointer',width: 120, height: 40, marginTop: 10 }}
            className={Styles.image}
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="AMAZON"
            onClick={()=> navigate("/")}
          />
        </div>
        {/* Search bar */}
        <div className={Styles.headerInputContainer}>
          <input
            className={Styles.headerInput}
            type="text"
            placeholder="Search Items or products"
          />
          <SearchOutlinedIcon
            style={{ color: "white", marginLeft: 4, marginTop: 2 }}
          />
        </div>

        <div style={{cursor:"pointer"}} onClick={()=>navigate("/logout")}>
          <h4 className={Styles.headerText}>Hello {data.name}</h4>
          <h4 className={Styles.headerText}>Accounts & Lists</h4>
        </div>

        <div>
          <h4 className={Styles.headerText}>Returns</h4>
          <h4 className={Styles.headerText}>& Orders</h4>
        </div>

        <div style={{ position: "relative", cursor:'pointer' }} onClick={()=>navigate("/cart")}>
          <ShoppingCartIcon style={{ color: "white" }} />
          <span
            style={{
              position: "absolute",
              left: 14,
              right: 14,
              backgroundColor: "white",
              width: 14,
              height: 14,
              borderRadius: 7,
              fontSize: 12,
              fontWeight: 400,
              textAlign: "center",
            }}
          >
            {cart.length}
          </span>
        </div>

        {/* Place and number */}
        <div>
          <h4 className={Styles.headerText}>India</h4>
          <h4 className={Styles.headerText}>{data.mobileNum}</h4>
        </div>

        {/* Bottom Header part */}
      </div>
      <div className={Styles.headerBottom}>
        <MenuIcon style={{color:"white",paddingTop:6 }}/> 
        <p>Buy</p>
        <p>Healthy Products</p>
        <p>Sell</p>
        <p>Baby</p>
        <p>Health & LifeStyle</p>
        <p>Prime Video</p>
        <p>Super Sale</p>
        <p>Offers</p>
        <p>Exciting Offers</p>
        <p>Subscribe</p>
      </div>
    </>
  );
}
