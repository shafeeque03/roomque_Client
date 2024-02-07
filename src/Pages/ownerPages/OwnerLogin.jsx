import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// import 'react-toastify/dist/React-toastify.css'
import { loginSchema } from '../../Validations/user/loginValidation'
// import { loginVerifcation } from '../../api/userApi'
import { ownerLoginVerifcation } from '../../api/ownerApi'
import { useDispatch } from 'react-redux'
// import { userLogin } from '../../Redux/slices/UserSlice'
import { ownerLogin } from '../../Redux/slices/OwnerSlice'
import { useFormik } from 'formik'


const OwnerLogin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit,
    });

    async function onSubmit() {
      try {
        console.log("working well vro")
        const res = await ownerLoginVerifcation(values);
        if(res?.status ==200){
          const {token, owner} = res.data
          localStorage.setItem("ownerToken", token)
          dispatch(
            ownerLogin({
              token:token,
              owner:owner
            })
          );
          navigate("/owner",{state:{ownerId:owner._id}});
        }
      } catch (error) {
        toast.error(error.response?.data?.message||"Email or Password incorrect");
        console.log(error, "response in error");
      }
    }
  return (
    <>

<section class="bg-gray-50">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            {/* <img class="w- h-8 mr-" src="logo_user.png" alt="logo"/> */}
            {/* <img className="w-35 h-10 mr-2" src="full_logo.png" alt="logo" /> */}
            <h1 class="text-blue-800 text-4xl flex">roomque <p class="text-lg mt-4 ml-1">Owner</p></h1>
          </a>
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-blue-800 dark:border-green-900">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Signin
              </h1>
              <form class="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Email"
                    required=""
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-600">{errors.email}</p>
                  )}
                </div>
            
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && (
                    <p className="text-red-600">{errors.password}</p>
                  )}
                </div>
                <p class="text-sm font-light text-slate-50 dark:text-slate-50"><Link to="/owner/forgotPassword">Forgot password</Link></p>

                
                <button
                  type="submit"
                  class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Login
                </button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account?{" "}
                  <a
                    
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    <Link to="/owner/signup">Signup</Link>
                  </a>
                </p>
                <a
                    
                    class="text-sm text-slate-400 hover:underline dark:text-primary-500"
                  >
                    <Link to="/login">User Login</Link>
                  </a>
              </form>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default OwnerLogin