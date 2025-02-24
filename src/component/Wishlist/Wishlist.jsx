import React, { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";

export default function Wishlist() {
  const [wishList, setWishList] = useState(null);
  const [addingProductId, setAddingProductId] = useState(null);
  const [loading, setLoading] = useState(true);

  let { addToCart, setCartIcon } = useContext(CartContext);
  let { getWishlistItems, removeItem } = useContext(WishlistContext);

  async function addProductToCart(productId) {
    setAddingProductId(productId);
    const response = await addToCart(productId);
    if (response.data.status === "success") {
      setCartIcon(response.data);
      toast.success("It has been successfully added.");
    } else {
      toast.error("Error adding");
    }
    setAddingProductId(null);
  }

  async function getWishlist() {
    let response = await getWishlistItems();
    setWishList(response.data);
    setLoading(false);
  }

  async function removeItemFromWish(productId) {
    let response = await removeItem(productId);
    if (response.data.status === "success") {
      setWishList((prevState) => ({
        ...prevState,
        data: prevState.data.filter((item) => item.id !== productId),
      }));
      toast.success("Product removed from wishlist.");
    } else {
      toast.error("Error removing product");
    }
  }

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <div className="container">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="wish bg-gray-100 mt-20 p-7">
          <h2 className="text-2xl font-semibold ml-4 py-3">My Wish List</h2>
          {wishList?.data.length > 0 ? (
            wishList.data.map((product) => (
              <div className="row" key={product.id}>
                <img
                  className="w-full md:w-1/6"
                  src={product.imageCover}
                  alt={product.title}
                />
                <div className="md:w-2/3 md:mx-4">
                  <h3 className="font-bold text-gray-600">{product.title}</h3>
                  <span className="text-green-600 font-semibold block">
                    {product.price} EGP
                  </span>
                  <span
                    onClick={() => removeItemFromWish(product.id)}
                    className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    <i className="fa-solid fa-trash mr-1 text-red-600"></i>
                    Remove
                  </span>
                  <div className="flex justify-end md:translate-x-24">
                    <button
                      onClick={() => addProductToCart(product.id)}
                      className="borderr rounded-md py-2 px-4"
                      disabled={addingProductId === product.id}
                    >
                      {addingProductId === product.id
                        ? "Adding..."
                        : "Add to cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Your wishlist is empty.</p>
          )}
        </div>
      )}
    </div>
  );
}
