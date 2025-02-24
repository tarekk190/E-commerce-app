import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";
export let CartContext = createContext();


export default function CartContextProvider(props) {
  const [cartIcon, setCartIcon] = useState(null)

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function addToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((err) => err);
  }

  function getCartItem() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((response) => response)
      .catch((err) => err);
  }

  function removeCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) => response)
      .catch((err) => err);
  }
  function updateCartItem(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((err) => err);
  }
  function checkOut(productId, url, formValue) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${productId}?url=${url}`,
        {
          shippingAddress: formValue,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((err) => err);
  }

  async function getCart(){
    let response = await getCartItem()
    setCartIcon(response.data)
  } 

  useEffect(()=>{
    getCart();
  },[])

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getCartItem,
        removeCartItem,
        updateCartItem,
        checkOut,
        cartIcon,
        setCartIcon
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
