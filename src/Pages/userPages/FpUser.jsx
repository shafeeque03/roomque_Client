import React, { useState } from "react";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { forgotPassword } from "../../api/userApi";

const FpUser = () => {
  const navigate = useNavigate();
  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Required"),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
  useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: formSchema,
    onSubmit: onSubmit,
  });

  async function onSubmit() {
    try {
        console.log("ohoho")
      const res = await forgotPassword(values);
      if (res?.status === 201) {
        const { userData, otpId } = res.data;
        navigate("/fOtpUser", {
          state: {
            userEmail: userData.email,
            otpId: otpId,
            userId: userData._id,
          },
        });
      }else{
        toast.error(response?.data?.message||"Enter correct OTP");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.error(error.message);
    }
  }
  return (
    <>
      <div class="wrapper">
        <div class="login-box">
            
          <div class="login-header">
            <div class='text-center text-slate-900 font-bold'>
            <p>Forgot</p>
            <p>Password</p>
            </div>
          </div>
            
          <form onSubmit={handleSubmit}>
            <div class="input-box">
              <input
                type="email"
                id="email"
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
              <i class="bx bx-user icon"></i>
              
            </div>
           
            

            <div class="input-box">
              <input type="submit" class="input-submit" value="Enter" />
            </div>
            <div class="register">
              <span class='hover:underline'>
                Back to login? <Link to="/login">login</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FpUser;
