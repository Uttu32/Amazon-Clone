import React from "react";
import Styles from "./Cart.module.css";
import Header from "../component/Header";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/CartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  const charges = 30;

  const orders = [...cart]  

  const totalPrice = total + charges;

  const dispatch = useDispatch();
  const incrementItemQuantity = (item) => {
    dispatch(incrementQuantity(item));
  };

  const decrementItemQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };

  const removeItemfromCart = (item) => {
    dispatch(removeFromCart(item));
  };
  
  const placeOrder = (item) =>{
    toast.success('Order Placed Successfully', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });

      setTimeout(()=>{
        navigate("/orders", {
        state:{
          orders:orders,
          totalPrice: totalPrice
        }
        })
      },3500)

      setTimeout(()=>{
        dispatch(clearCart())
      },4000)
  }

  return (
    <>
      <Header />
      <div className={Styles.cart}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        {/* Left Part  */}
        <div className={Styles.cartLeft}>
          {cart.map((item, index) => {
            return (
              <div className={Styles.cartContainer}>
                {/* Image  */}
                <div>
                  <img src={item.image} style={{ width: 100, height: 100 }} />
                </div>

                {/* Description  */}
                <div className={Styles.cartDescription}>
                  <p>
                    {item.title.length > 60
                      ? item.title.substr(0, 60)
                      : item.title}
                  </p>
                  <p style={{ marginTop: 8 }}>
                    {" "}
                    {item.description.length > 80
                      ? item.description.substr(0, 80)
                      : item.description}
                  </p>
                  <p style={{ marginTop: 8 }}> {item.price} rs/-</p>
                </div>

                {/* Buttons  */}
                <div className={Styles.cartButtonContainer}>
                  <div className={Styles.cartButtons}>
                    <div
                      onClick={() => decrementItemQuantity(item)}
                      style={{ cursor: "pointer" }}
                    >
                      -
                    </div>

                    <div>{item.quantity}</div>
                    <div
                      onClick={() => incrementItemQuantity(item)}
                      style={{ cursor: "pointer" }}
                    >
                      +
                    </div>
                  </div>
                  <button
                    onClick={() => removeItemfromCart(item)}
                    className={Styles.cartButton}
                  >
                    Remove Items
                  </button>
                  <h5 style={{ marginTop: 7 }}>
                    {item.price * item.quantity} rs/-
                  </h5>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Part  */}
        {total === 0 ? (
          <div>
            <h2 style={{ marginLeft: "-500px" }}>Your Cart is Empty</h2>
          </div>
        ) : (
          <div className={Styles.cartRight}>
            {/* Location info and button  */}
            <div className={Styles.cartRightLocationContainer}>
              <div className={Styles.cartRightLocation}>
                <LocationOnIcon style={{ color: "gray" }} />
                <div className={Styles.cartRightDescription}>
                  <p>Select your Location</p>
                  <p>Please select a location so we can find you! </p>
                  <button>Select Location</button>
                </div>
              </div>

              <div className={Styles.cartRightLocation}>
                <LocationOnIcon style={{ color: "gray" }} />
                <div className={Styles.cartRightDescription}>
                  <p>Choose your saved location</p>

                  <button>Choose Location</button>
                </div>
              </div>
            </div>

            {/* Coupon info and description  */}
            <div className={Styles.cartRightCoupon}>
              <ConfirmationNumberIcon style={{ color: "gray" }} />
              <div style={{ marginLeft: 10 }}>
                <h4>Select / Apply Coupon</h4>
                <p>Apply coupons to avail offers on the products</p>
              </div>
            </div>

            {/* Container for the checkout and the total */}
            <div className={Styles.cartRightCheckout}>
              <div className={Styles.cartRightCheckoutPart}>
                <h5>Total Price</h5>
                <h5>{total}</h5>
              </div>

              <div className={Styles.cartRightCheckoutPart}>
                <h5>Discount</h5>
                <h5>-</h5>
              </div>

              <div className={Styles.cartRightCheckoutPart}>
                <h5>Charges</h5>
                <h5>{charges}</h5>
              </div>

              <div className={Styles.cartRightCheckoutPart}>
                <h3>Grand Total</h3>
                <h3>{charges + total}</h3>
              </div>

              <button onClick={placeOrder} >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
