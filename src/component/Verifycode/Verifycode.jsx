import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";

export default function ForgetPass() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  function handelForgetPass(formValues) {
    setIsLoading(true);
    axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        formValues
      )
      .then((response) => {
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
      resetCode: "",
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

        <h2 className="text-2xl font-bold text-green-500">reset your account password</h2>
        <form onSubmit={formik.handleSubmit} className="w-full mx-auto mt-3  ">
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="number"
              name="resetCode"
              id="resetCode"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="resetCode"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Code
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
