import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import 'react-toastify/dist/React-toastify.css'
import { loginSchema } from "../../Validations/user/loginValidation";
import { loginVerifcation } from "../../api/userApi";
import { useDispatch } from "react-redux";
import { userLogin } from "../../Redux/slices/UserSlice";
import { useFormik } from "formik";

const UserLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const res = await loginVerifcation(values);
      if (res?.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem("userToken", token);
        dispatch(
          userLogin({
            token: token,
            user: user,
          })
        );
        navigate("/");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("hi from error");
      toast.error(error.response?.data?.message || "An error occured");
      console.log(error.response?.data?.message, "response in error");
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
              <i class="bx bx-user icon"></i>
              
            </div>
            <div class="input-box">
              <input
                type="password"
                id="password"
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
            </div>
            <div class="remember-forgot">
              <div class="forgot">
              <Link to="/forgotPassword">Forgot Password</Link>
              </div>
            </div>

            <div class="input-box">
              <input type="submit" class="input-submit" value="Login" />
            </div>
            <div class="register">
              <span class='hover:underline'>
                Don't have an account? <Link to="/signup">Signup</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
