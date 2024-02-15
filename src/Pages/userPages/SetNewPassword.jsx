import React, { useState } from "react";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { verifyPasswordUser } from "../../api/userApi";
import { useLocation } from "react-router-dom";
import userSignupValidation from "../../Validations/user/userSignupValidation";

const SetNewPassword = () => {
  const location = useLocation()
  const x = location.state
  const navigate = useNavigate();


  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
  useFormik({
    initialValues: {
        password: "",
        cPassword: "",
    },
    validationSchema: userSignupValidation,
    onSubmit: onSubmit,
  });

  async function onSubmit() {
    try {
      console.log("hii");
      const res = await verifyPasswordUser(values.password,x.userId);
      if (res?.status === 200) {
        toast.success(res?.data?.message||"Success")
        navigate("/login")
          
        
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
      
      <div class="wrapper">
        <div class="login-box">
          <div class="login-header">
            <span> Login</span>
          </div>
          <form onSubmit={handleSubmit}>
            
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
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
            </div>
            <div class="input-box">
              <input
                type="password"
                id="password"
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
                    <p className="text-red-500 text-sm mt-1">
                      {errors.cPassword}
                    </p>
                  )}
            </div>

            <div class="input-box">
              <input type="submit" class="input-submit" value="Enter" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SetNewPassword;
