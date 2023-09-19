import React from "react";
import Styles from "./ProductItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/CartSlice";
import { useNavigate } from "react-router-dom";

export default function Productitem({ item }) {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    dispatch(addToCart(item));
  };

  const removeItemFromCart = (item) => {
    dispatch(removeFromCart (item));
  };

  const BuyNow =(item) =>{
    dispatch(addToCart(item));
    navigate("/cart")
  }

  return (
    <div className={Styles.ProductItem}>
      {/* Image */}
      <img
        style={{
          width: 200,
          height: 200,
          marginLeft: "auto",
          marginRight: "auto",
        }}
        src={item.image}
      />
      {/* Title */}
      <p>{item.title.length > 30 ? item.title.substr(0, 30) : item.title}</p>
      {/* Description of product  */}
      <p>
        {item.description.length > 60
          ? item.description.substr(0, 60)
          : item.description}
      </p>

      {/* price  */}
      <p>{item.price}</p>
      {/* Add to Cart Button */}
      {cart.some((x) => x.id === item.id) ? (
        <button
          onClick={() => removeItemFromCart(item)}
          className={Styles.productItemButton}
        >
          Remove from Cart
        </button>
      ) : (
        <button
          onClick={() => addItemToCart(item)}
          className={Styles.productItemButton}
        >
          Add to Cart
        </button>
      )}

      {/* Buy Now Button  */}
      <button onClick={()=> BuyNow(item)} className={Styles.productItemBuy}>Buy Now</button>
    </div>
  );
}
