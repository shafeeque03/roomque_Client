import React, { useEffect, useRef, useState } from 'react'
import { otpSchema } from '../../Validations/user/otpValidation'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import { useLocation,useNavigate } from 'react-router-dom'
import { ownerOtpVerification,ownerResendOtp } from '../../api/ownerApi'

const Fotp = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { ownerEmail, otpId, ownerId} = location.state;
  const [countDown, setCountDown] = useState(30)
  const[showResendButton, setShowResendButton] = useState(false)
  const decrementTimer = ()=>{
    if (countDown > 0) {
      setCountDown(countDown-1);
    }else{
      setShowResendButton(true)
    }
  }

  useEffect(()=>{
    const timer = setInterval(decrementTimer, 1000);
    return ()=>{
      return clearInterval(timer)
    }
  },[countDown]);

  const onSubmit = async () =>{
    try {
      const combinedOTP = Object.values(values).join("");
      console.log("hai onSubmit")
      const res = await ownerOtpVerification(combinedOTP, otpId, ownerId)
      if(res?.data?.status){
        toast.success(res?.data?.message);
        navigate("/owner/newPassword", {state: {ownerId:ownerId}})
    }
    } catch (error) {
      toast.error(error.response.data.message|| "Entered OTP is wrong")
    }
  }

  const resendOTP = async ()=>{
    try {
      const res = await ownerResendOtp(ownerEmail);
      console.log(res,"this is response")
      if (res.status == 200){
        toast.success(res.data.message)
        setCountDown(30);
        setShowResendButton(false)
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message)
    }
  }

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
    },
    validationSchema: otpSchema,
    onSubmit,
  });

  const input1Ref = useRef();
  const input2Ref = useRef();
  const input3Ref = useRef();
  const input4Ref = useRef();

  const handleKeyUp = (e) => {
    switch (e.target.name) {
      case "otp1":
        input2Ref.current.focus();
        if (!e.target.value) {
          input1Ref.current.focus();
        } else {
          input2Ref.current.focus();
        }
        break;
      case "otp2":
        if (!e.target.value) {
          input1Ref.current.focus();
        } else {
          input3Ref.current.focus();
        }
        break;
      case "otp3":
        if (!e.target.value) {
          input2Ref.current.focus();
        } else {
          input4Ref.current.focus();
        }
        break;
      case "otp4":
        if (!e.target.value) {
          input3Ref.current.focus();
        } else {
          input4Ref.current.focus();
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-white-50 py-12">
      <h1 class="text-blue-800 text-4xl items-center text-center m-5 font-semibold">roomque</h1>
      
          <div className="relative bg-blue-800 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
            <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <div className="font-semibold text-3xl">
                  <p className='text-white'>Email Verification</p>
                </div>
                <div className="flex flex-row text-sm font-medium text-gray-400">
                  <p className='text-white'>We have sent a code to your email {ownerEmail}</p>
                </div>
              </div>

              <div>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col space-y-16">
                    <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                      <div className="w-16 h-16 ">
                        <input
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name="otp1"
                          maxLength={1}
                          ref={input1Ref}
                          value={values.otp1}
                          onChange={handleChange}
                          onKeyUp={handleKeyUp}
                          id=""
                        />
                        {errors.otp1 && touched.otp1 && (
                          <p className="text-red-600">{errors.otp1}</p>
                        )}
                      </div>
                      <div className="w-16 h-16 ">
                        <input
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name="otp2"
                          maxLength={1}
                          ref={input2Ref}
                          value={values.otp2}
                          onChange={handleChange}
                          onKeyUp={handleKeyUp}
                          id=""
                        />
                        {errors.otp2 && touched.otp2 && (
                          <p className="text-red-600">{errors.otp2}</p>
                        )}
                      </div>
                      <div className="w-16 h-16 ">
                        <input
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name="otp3"
                          maxLength={1}
                          ref={input3Ref}
                          value={values.otp3}
                          onChange={handleChange}
                          onKeyUp={handleKeyUp}
                          id=""
                        />
                        {errors.otp3 && touched.otp3 && (
                          <p className="text-red-600">{errors.otp1}</p>
                        )}
                      </div>
                      <div className="w-16 h-16 ">
                        <input
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name="otp4"
                          maxLength={1}
                          ref={input4Ref}
                          value={values.otp4}
                          onChange={handleChange}
                          onKeyUp={handleKeyUp}
                          id=""
                        />
                        {errors.otp4 && touched.otp4 && (
                          <p className="text-red-600">{errors.otp4}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-5">
                      <div>
                        <button
                          className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-600 border-none text-white text-sm shadow-sm hover:bg-blue-700"
                          type="submit"
                        >
                          Verify Account
                        </button>
                      </div>

                      <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-white">
                        {countDown > 0 ? (
                          <p>Resend otp in {countDown} seconds</p>
                        ) : (
                          showResendButton && (
                            <p
                              className="font-medium text-white hover:underline cursor-pointer"
                              onClick={resendOTP}
                            >
                              Resend OTP
                            </p>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Fotp