import React, { useState } from "react";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { verifyPassword } from "../../api/ownerApi";
import { useLocation } from "react-router-dom";

const NewPassword = () => {
  const location = useLocation()
  const x = location.state
  const navigate = useNavigate();
  const formSchema = yup.object().shape({
    password: yup.string()
    .min(5, "Password should contain 5-16 characters")
    .max(16, "Password should contain 5-16 characters")
    .required("Required"),
    cPassword: yup.string().oneOf([yup.ref("password")],"Password Not match")
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
  useFormik({
    initialValues: {
        password: "",
        cPassword: "",
    },
    validationSchema: formSchema,
    onSubmit: onSubmit,
  });

  async function onSubmit() {
    try {
      const res = await verifyPassword(values.password,x.ownerId);
      if (res?.status === 200) {
        navigate("/owner/login")
      }else{
        toast.error(res?.data?.message||"Something Wrong");
      }
    } catch (error) {
      toast.error(error.res?.data?.message);
      console.error(error.message);
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
            <h1 class="text-blue-800 text-4xl flex">
              roomque <p class="text-lg mt-4 ml-1">Owner</p>
            </h1>
          </a>
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-blue-800 dark:border-green-900">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                New Password
              </h1>
              <form
                class="space-y-4 md:space-y-6"
                onSubmit={handleSubmit}
              >
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
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
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
                    <p className="text-red-500 text-sm mt-1">
                      {errors.cPassword}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Enter
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewPassword;
