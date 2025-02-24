import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function CategotySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const [categories, setCategories] = useState([]);

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategories(data.data);
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
      <div className="py-5 mt-5">
        <Slider {...settings}>
          {categories.map((category) => (
            <div key={category._id}>
              <img
                className="h-[200px] w-full"
                src={category.image}
                alt={category.name}
              />
              <h3>{category.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
