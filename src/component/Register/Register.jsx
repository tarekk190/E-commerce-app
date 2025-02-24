import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup' 
import { UserContext } from '../../Context/UserContext';

export default function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  let { setUserLogin } = useContext(UserContext); 

  let navigate = useNavigate();


  let validationSchema = Yup.object().shape({
    name:Yup.string().min(3, "name min length is 3").max(10, "name max length is 10").required("name is required"),
    email:Yup.string().email("email is invalid").required("email is required"),
    phone:Yup.string().matches(/^01[0125][0-9]{8}$/, "Phone must be an Egyptian number").required("phone is required"),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,`It must start with a capital letter and 5,10 lowercase letters or numbers `
      )
      .required("password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "re-Password pattern is inavalid")
      .required("password is required"),
  }); 

  function handelRegister(formValues){
    setIsLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,formValues)
    .then((response)=>{
      if(response?.data?.message === 'success'){
        localStorage.setItem('userToken',response.data.token)
        setUserLogin(response.data.token);
        setIsLoading(false)
        navigate("/");
      }
    }).catch((err)=>{
      setIsLoading(false)
      setApiError(err?.response?.data?.message);
    })
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: handelRegister,
  });
  return (
    <>
      <div className="contaier mt-32">
        {apiError?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {apiError}
          </div>:null}
        
        <h2 className='text-2xl font-bold text-green-500'>Register Now</h2>
        <form onSubmit={formik.handleSubmit} className="w-full mx-auto mt-3  ">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            
            <label
              htmlFor="floating_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name :
            </label>
          </div>
          {formik.errors.name && formik.touched.name?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.name}
          </div>:null}
          
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
          {formik.errors.email && formik.touched.email?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.email}
          </div>:null}
          <div className="relative z-0 w-full mb-5 group">
            <input
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Passowrd :
            </label>
          </div>
          {formik.errors.password && formik.touched.password?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.password}
          </div>:null}
          <div className="relative z-0 w-full mb-5 group">
            <input
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
              type="password"
              name="rePassword"
              id="rePassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="repassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Re-password :
            </label>
          </div>
          {formik.errors.rePassword && formik.touched.rePassword?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.rePassword}
          </div>:null}
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
              Phone
            </label>
          </div>
          {formik.errors.phone && formik.touched.phone?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.phone}
          </div>:null}
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                {isLoading?<i className='fas fa-spinner fa-spin'></i>:'Register Now'}
            </button>
        </form>
      </div>
    </>
  );
}
