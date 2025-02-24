import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgetPass() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  let navigate = useNavigate();

  function handelForgetPass(formValues) {
    setIsLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, formValues)
      .then((response) => {
        
        console.log(response);
        navigate("/verify-code");
        if (data?.data?.statusMsg === "success") {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setApiError(err?.response?.data?.message);
      });
  }

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: handelForgetPass,
  });
  return (
    <>
      <div className="contaier mt-32">
        {apiError ? (
          <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {apiError}
          </div>
        ) : null}

        <h2 className="text-2xl font-bold text-green-500">Enter Your Email</h2>
        <form onSubmit={formik.handleSubmit} className="w-full mx-auto mt-3  ">
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
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
                "Verify"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
