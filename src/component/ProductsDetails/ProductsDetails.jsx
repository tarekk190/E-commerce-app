import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';


export default function ProductsDetails() {
  const [productsDetails, setProductsDetails] = useState(null)


  const [addingProductId, setAddingProductId] = useState(null);

  let { addToCart, setCartIcon } = useContext(CartContext);

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


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };


  let {id} = useParams();

  function getProductDetails(id){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then(({data})=>{
      
      setProductsDetails(data.data)
      
    }).catch(()=>{

    })
  }
  useEffect(()=>{
    getProductDetails(id)
  },[])
  return (
    <>
      <div className="row mt-5">
        <div className="w-full md:w-1/3 p-4">
          <Slider {...settings}>
            {productsDetails?.images.map((src) => (
              <img
                key={productsDetails?.id}
                className="w-full"
                src={src}
                alt={productsDetails?.title}
              />
            ))}
          </Slider>
        </div>
        <div className="w-full mt-3 md:w-2/3">
          <h3 className="text-lg text-gray-800 font-normal">
            {productsDetails?.title}
          </h3>
          <p className="text-gray-600 mt-2 font-light ">
            {productsDetails?.description}
          </p>
          <div className="flex justify-between mt-2">
            <span>{productsDetails?.price} EGP</span>
            <span>
              {productsDetails?.ratingsAverage}{" "}
              <i className="fas fa-star text-yellow-400"></i>
            </span>
          </div>
          <div className="flex mt-3">
            <button
              onClick={() => addProductToCart(productsDetails.id)}
              className="btn hover:bg-green-700 duration-300"
            >
              Add to cart +
            </button>
            <i className="fa-solid fa-heart p-4 fa-2xl cursor-pointer text-green-600 mt-1 "></i>
          </div>
        </div>
      </div>
    </>
  );
}
