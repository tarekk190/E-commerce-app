import { useFormik } from "formik";
import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import axios from "axios";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  let {checkOut , cartIcon } = useContext(CartContext) 

  // async function handelCheckout(shippingAddress) {
  //   let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${productId}?url=${url}`)
  //   if(data.status == 'success'){
  //     window.location.href = data.session.url
  //   }
  // }

  async function handelCheckout(cartId ,url) {
    let {data} = await checkOut(cartId,url , formik.values);
    if(data.status == 'success'){
      window.location.href = data.session.url
    }
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: ()=> handelCheckout(`${cartIcon.cartId}`,'http://localhost:5173/'),
  });
  return (
    <>
      <div className="contaier mt-32">
        <h2 className="text-2xl font-bold text-green-500">Login Now</h2>
        <form onSubmit={formik.handleSubmit} className="w-full mx-auto mt-3  ">
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="details"
              id="details"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="details"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              details
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="tel"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              phone
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="city"
              id="city"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="city"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              city
            </label>
          </div>
          <div className="flex justify-between flex-wrap">
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Pay Now"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
