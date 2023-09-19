import React from "react";
import Styles from "./OrderScreen.module.css";
import { useLocation } from "react-router-dom";
import Header from "../component/Header";

export default function OrderScreen() {
  const location = useLocation();
  console.log(location.state);
  return (
    <>
    <Header />
    <div className={Styles.orders}>      
      <div>
        <h3>Your Orders</h3>
        {location.state.orders.map((order) => {
          return (
            <div>
              <div className={Styles.orderContainer}>
                <img style={{ width: 140, height: 140 }} src={order.image} />
                <div>
                  <p>{order.title}</p>
                  <p>
                    {order.description.length > 80
                      ? order.description.substr(0, 80)
                      : order.description}
                  </p>
                  <p style={{ fontWeight: "bold" }}>
                    {order.price * order.quantity} Rs./-
                  </p>
                </div>
                <div className={Styles.orderButtons}>
                  <button>Return Products</button>
                  <button>Download Invoice</button>
                  <button>Rate Products</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor:'goldenrod',
          marginTop:'40px',

        }}
      >
        <h3>Total Price</h3>
        <h2>{location.state.totalPrice} Rs./-</h2>
      </div>
    </div>
    </>
  );
}
