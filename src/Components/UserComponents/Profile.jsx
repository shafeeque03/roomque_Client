import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { editProfile, uploadProfilePhoto } from "../../api/userApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userLogin } from "../../Redux/slices/UserSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";

const Profile = () => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const userId = user._id;

  const handleFileChange = async (e) => {
    try {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64Image = reader.result;

        const res = await uploadProfilePhoto(base64Image, userId, user.profilePhoto);

        if (res.status === 200) {
          setIsEdit(false);
          const { userData } = res.data;

          dispatch(
            userLogin({
              user: userData,
            })
          );
          toast.success(res?.data?.message);
        }
      };
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
      console.log(error.message);
    }
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await editProfile({ ...values, userId });
      if (res?.status === 200) {
        setLoading(false);
        setIsEdit(false);
        const { user } = res.data;

        dispatch(
          userLogin({
            user: user,
          })
        );
        toast.success(res?.data?.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
      console.log(error.message);
    }
  };

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      number: user.number,
    },
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <div>
      <div className="w-full min-h-screen bg-slate-50  p-7 fade-ef">
        <h2 className="text-center mb-5 text-3xl font-bold text-green-700">
          PROFILE
        </h2>
        <div className="container mx-auto">
          <div>
            <div className="bg-white relative shadow w-5/6 md:w-5/6 rounded-3xl lg:w-4/6 xl:w-3/6 mx-auto p-5">
              <div className="relative w-52 h-52 rounded-full border-2 m-auto">
                <label htmlFor="profilePhoto" className="cursor-pointer">
                  <img
                    src={user.profilePhoto || "/userLogo.png"}
                    className="w-full h-full object-cover rounded-full"
                    alt=""
                  />
                  {isEdit && (
                    <div className="absolute bottom-2 right-2 bg-slate-200 rounded-full p-2 cursor-pointer">
                      <input
                        type="file"
                        id="profilePhoto"
                        name="profilePhoto"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <FontAwesomeIcon
                        icon={faImage}
                        className="h-6 w-6 text-gray-700"
                      />
                    </div>
                  )}
                </label>
              </div>

              {isEdit === false ? (
                <>
                  <div className="p-4">
                    <h1 className="font-bold text-center text-3xl text-gray-600">
                      {user.name}
                    </h1>
                    <p className="text-center text-sm text-gray-400 font-medium">
                      {user.email}
                    </p>
                    <p className="text-center mt-5">
                      <span className="text-slate-900 text-md font-bold text-center">
                        Wallet: ₹ {user.wallet}
                      </span>
                    </p>

                    <div className="w-full">
                      <div className="mt-5 overflow-hidden text-sm">
                        <label
                          htmlFor="roomName"
                          className="block text-sm font-medium py-2 ms-2 text-gray-600"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          className="border rounded p-3 w-full text-slate-700"
                          value={values.name}
                          disabled
                        />
                      </div>
                      <div className="mt-5 overflow-hidden text-sm">
                        <label
                          htmlFor="roomName"
                          className="block text-sm font-medium py-2 ms-2 text-gray-600"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          className="border rounded p-3 w-full text-slate-700"
                          value={values.email}
                          disabled
                        />
                      </div>
                      <div className="mt-5 overflow-hidden text-sm">
                        <label
                          htmlFor="roomName"
                          className="block text-sm font-medium py-2 ms-2 text-gray-600"
                        >
                          Phone
                        </label>
                        <input
                          type="text"
                          className="border rounded p-3 w-full text-slate-700"
                          value={values.number}
                          disabled
                        />
                      </div>
                      <div className="mt-5  text-sm">
                        <button
                          type="button"
                          className="text-white w-full bg-blue-700 mt-2 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-3 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                          onClick={() => setIsEdit(true)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-4">
                    <h1 className="font-bold text-center text-3xl text-gray-600">
                      {user.name}
                    </h1>
                    <p className="text-center text-sm text-gray-400 font-medium">
                      {user.email}
                    </p>
                    <p>
                      <span></span>
                    </p>

                    <div className="w-full">
                      <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
                        <div className="mt-5 overflow-hidden text-sm">
                          <label
                            htmlFor="roomName"
                            className="block text-sm font-medium py-2 ms-2 text-gray-600"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            className="border rounded p-3 w-full text-slate-700"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                        <div className="mt-5 overflow-hidden text-sm">
                          <label
                            htmlFor="roomName"
                            className="block text-sm font-medium py-2 ms-2 text-gray-600"
                          >
                            Email
                          </label>
                          <input
                            type="text"
                            name="email"
                            className="border rounded p-3 w-full text-slate-700"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                        <div className="mt-5 overflow-hidden text-sm">
                          <label
                            htmlFor="roomName"
                            className="block text-sm font-medium py-2 ms-2 text-gray-600"
                          >
                            Phone
                          </label>
                          <input
                            type="number"
                            name="number"
                            className="border rounded p-3 w-full text-slate-700"
                            value={values.number}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                        <div className="mt-5 text-sm">
                          <button
                            type="submit"
                            className="text-white w-full bg-blue-700 mt-2 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-3 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
