import React from 'react'
import slide1 from '../../assets/image/41nN4nvKaAL._AC_SY200_ (1).jpg'
import slide2 from '../../assets/image/61cSNgtEISL._AC_SY200_.jpg'
import slide3 from '../../assets/image/XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379x304_1X._SY304_CB650636675_.jpg'
import slide4 from '../../assets/image/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg'
import slide5 from '../../assets/image/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_ (1).jpg'
import Slider from 'react-slick'



export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows:false
  }

  return (
    <>
      <div className="row mt-10">
        <div className="w-full md:w-1/2 md:pl-96">
          <Slider {...settings}>
          <img className="w-full h-[400px]" src={slide1} alt="" />
          <img className="w-full h-[400px]" src={slide2} alt="" />
          <img className="w-full h-[400px]" src={slide3} alt="" />
            
          </Slider>
        </div>
        <div className="w-full md:w-1/2 md:pe-96 mt-8 md:mt-0 ">
          <img className="w-full h-[200px]" src={slide4} alt="" />
          <img className="w-full h-[200px]" src={slide5} alt="" />
        </div>
      </div>
    </>
  );
}
