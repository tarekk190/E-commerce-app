import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import MainSlider from "../MainSlider/MainSlider";
import CategotySlider from "../CategotySlider/CategotySlider";
import { WishlistContext } from "../../Context/WishlistContext";

export default function Recentproducts() {
  const [recentProducts, setRecentProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addingProductId, setAddingProductId] = useState(null);
  const [wishlistProducts, setWishlistProducts] = useState([]);

  let { addToCart, setCartIcon } = useContext(CartContext);
  let { addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistProducts(savedWishlist);
  }, []);

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

  async function handleWishlist(productId) {
    let updatedWishlist;

    if (wishlistProducts.includes(productId)) {
      updatedWishlist = wishlistProducts.filter((id) => id !== productId);
      setWishlistProducts(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      removeFromWishlist(productId);
      toast.error("Product removed from wishlist.");
    } else {
      updatedWishlist = [...wishlistProducts, productId];
      setWishlistProducts(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      addToWishlist(productId);
      toast.success("Product added to wishlist.");
    }
  }

  function getRecentProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        setRecentProducts(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        return err;
      });
  }

  useEffect(() => {
    getRecentProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <MainSlider />
          <CategotySlider />
          <div className="row">
            {recentProducts.map((product) => (
              <div key={product.id} className="w-full md:w-1/4 sm:w-1/2">
                <div className="product mt-4 mx-3 p-4">
                  <Link to={`productsdetails/${product.id}`}>
                    <img
                      className="w-full"
                      src={product.imageCover}
                      alt={product.title}
                    />
                    <span className="block font-light text-green-600 mt-2">
                      {product.category.name}
                    </span>
                    <h3 className="text-lg font-normal mb-4 text-gray-800">
                      {product.title.split(" ").slice(0, 2).join(" ")}{" "}
                    </h3>
                    <div className="flex justify-between">
                      <span>{product.price} EGP</span>
                      <span>
                        {product.ratingsAverage}{" "}
                        <i className="fas fa-star text-yellow-400"></i>
                      </span>
                    </div>
                  </Link>
                  <span className="flex my-6">
                    <i
                      onClick={() => handleWishlist(product.id)}
                      className={`fa-solid fa-heart fa-2xl cursor-pointer ${
                        wishlistProducts.includes(product.id)
                          ? "text-red-600"
                          : "text-gray-400"
                      }`}
                    ></i>
                  </span>
                  <button
                    onClick={() => addProductToCart(product.id)}
                    className="btn my-4"
                    disabled={addingProductId === product.id}
                  >
                    {addingProductId === product.id
                      ? "Adding..."
                      : "Add to cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
