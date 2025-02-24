import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

export default function CategotySlider() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategories(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        return err;
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mx-auto p-2 w-[85%]">
          <div className="row py-5 mt-5">
            {categories.map((category) => (
              <div  className="w-full md:w-1/3 pl-5 my-3" key={category._id}>
                <div className="border box duration-300">
                  <img
                    className="h-[200px] w-full scale-100"
                    src={category.image}
                    alt={category.name}
                  />
                  <h3 className="bg-white text-green-600 text-2xl text-center p-3 border">
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
