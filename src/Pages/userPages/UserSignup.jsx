import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik, Formik, Form, Field } from "formik";
import userSignupValidation from "../../Validations/user/userSignupValidation";
import { Link, useNavigate } from "react-router-dom";
import { userSignup } from "../../api/userApi";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  cPassword: "",
};

const UserSignup = () => {
  const navigate = useNavigate();

  async function onSubmit() {
    try {
      // e.preventDefault()
      // console.log(values, "hiiiii");
      const res = await userSignup(values);
      console.log(res.status,"this is reponseee");
      if (res?.status === 201) {
        const {userData, otpId} = res.data
        navigate('/otp',{state:{userEmail: userData.email, otpId:otpId, userId:userData._id},})
        // const { user } = res.data;
        // toast(res.data.message);
      }
      // console.log("user signup");
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error)
    }
  }
  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: userSignupValidation,
    onSubmit,
  });

  return (
    <>
      {/* <section class="bg-gray-50 dark:bg-white-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <h1 class="text-green-900 text-4xl">roomque</h1>
          </a>
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-green-800 dark:border-green-900">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Name"
                    required=""
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.name && (
      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
    )}
                </div>
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
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.email && (
      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
    )}
                </div>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your phone
                  </label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Phone"
                    required=""
                    value={values.phone}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.phone && (
      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
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
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.password && (
      <p className="text-red-500 text-sm mt-1">{errors.password}</p>
    )}
                </div>
                <div>
                  <label
                    for="confirm-password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="cPassword"
                    id="cPassword"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={values.cPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.cPassword && (
      <p className="text-red-500 text-sm mt-1">{errors.cPassword}</p>
    )}
                </div>

                <button
                  type="submit"
                  class="w-full text-white bg-green-900 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <a

                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    <Link to="/login">Login</Link>
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section> */}

<div class="wrapper">
        <div class="login-box mt-6 mb-6">
          <div class="login-header">
            <span> Signup</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div class="input-box">
              <input
                type="text"
                id="mb"
                name="name"
                class="input-field"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />

              <label for="user" class="label">
                Name
              </label>
              <i class="bx bx-user icon"></i>
              {errors.name && (
      <p className="text-red-500 text-sm mb-3 ms-2">{errors.name}</p>
    )}
              
            </div>
            <div class="input-box">
              <input
                type="email"
                id="mb"
                name="email"
                class="input-field"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />

              <label for="user" class="label">
                Email
              </label>
              <i class="bx bx-envelope icon"></i>
              {errors.email && (
      <p className="text-red-500 text-sm mb-3 ms-2">{errors.email}</p>
    )}
        
            </div>
            <div class="input-box">
              <input
                type="number"
                id="mb"
                name="phone"
                class="input-field"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />

              <label for="user" class="label">
                Phone
              </label>
              <i class="bx bx-phone icon"></i>
              {errors.phone && (
      <p className="text-red-500 text-sm mb-3 ms-2">{errors.phone}</p>
    )}
        
            </div>
            <div class="input-box">
              <input
                type="password"
                id="mb"
                name="password"
                class="input-field"
                autocomplete="off"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label for="pass" class="label">
                Password
              </label>
              <i class="bx bx-lock-alt icon" id="show-password"></i>
              {errors.password && (
      <p className="text-red-500 text-sm mb-3 ms-2">{errors.password}</p>
    )}
        
            </div>

            <div class="input-box">
              <input
                type="password"
                id="mb"
                name="cPassword"
                class="input-field"
                autocomplete="off"
                value={values.cPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label for="pass" class="label">
                Confirm Password
              </label>
              <i class="bx bx-lock-alt icon" id="show-password"></i>
              {errors.cPassword && (
      <p className="text-red-500 text-sm mb-3 ms-2">{errors.cPassword}</p>
    )}
        
            </div>

            <div class="input-box">
              <input type="submit" class="input-submit" value="Signup" />
            </div>
            <div class="register">
              <span class='hover:underline'>
                Already have account? <Link to="/login">Login</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserSignup;
