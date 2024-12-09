import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
      }else if(res?.status==201){
        const { userData, otpId } = res.data;
        navigate("/otp", {
          state: {
            userEmail: userData.email,
            otpId: otpId,
            userId: userData._id,
          },
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
                class="input-field text-slate-600"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />

              <label for="user" class="label text-slate-400">
                Email
              </label>
              <i class="bx bx-user icon text-slate-800"></i>
              
            </div>
            <div class="input-box">
              <input
                type="password"
                id="password"
                name="password"
                class="input-field text-slate-600"
                autocomplete="off"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label for="pass" class="label text-slate-400">
                Password
              </label>
              <i class="bx bx-lock-alt icon text-slate-800" id="show-password"></i>
            </div>
            <div class="remember-forgot">
              <div class="forgot text-slate-400">
              <Link to="/forgotPassword">Forgot Password</Link>
              </div>
            </div>

            <div class="input-box">
              <input type="submit" class="input-submit text-slate-400" value="Login" />
            </div>
            <div class="register">
              <span class='hover:underline text-slate-400 cursor-pointer'>
                Don't have an account? <Link to="/signup">Signup</Link>
              </span>
            </div>
            <div className="bg-white rounded-xl mt-2">
              <p className="text-center text-black">Demo Login</p>
            <div class="register">
              <span class='hover:underline text-slate-700 cursor-pointer'>
                 <Link to="/owner/login">demo@gmail.com</Link>
              </span>
            </div>
            <div class="register">
              <span class='hover:underline text-slate-700 cursor-pointer'>
                 <Link to="/admin">Password : Demo@123</Link>
              </span>
            </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
