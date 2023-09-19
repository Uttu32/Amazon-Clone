import React, { useEffect, useState } from "react";
import Styles from "./Body.module.css";
import Productitem from "./ProductIem";
import { useSelector } from "react-redux";

export default function Body() {
  const [products, setProducts] = useState([]);

    const cart = useSelector((state)=> state.cart.cart);
    console.log(cart);

  useEffect(() => {
    async function fetchProducts() {
      await fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((er) => console.log(er));
    }
    fetchProducts();
  }, []);

  return (
    <div className={Styles.body}>
      <div className={Styles.bodyItems}>
        {products.map((item, index) =>{
            return(
            <Productitem item={item} key={item.id} />
            )
        })}
      </div>
    </div>
  );
}
