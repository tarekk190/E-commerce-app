import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function getAllBrands() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then(({ data }) => {
        setBrands(data.data);
        setIsLoading(false);
      })
      .catch();
  }

  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="title pt-20 text-green-600 font-semibold text-center fa-2xl">
            <h2>All Brands</h2>
          </div>
          <div className="row ">
            {brands.map((brand) => (
              <div
                className="w-full pl-5 md:w-1/4 sm:w-1/2 flex my-2 "
                key={brand._id}
              >
                <div className="border box rounded-md duration-500">
                  <img className="w-full" src={brand.image} alt={brand.slug} />
                  <h5 className="text-center py-5 text-xs text-gray-600">
                    {brand.name}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
