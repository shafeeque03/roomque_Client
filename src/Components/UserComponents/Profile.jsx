import { useFormik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { editProfile } from "../../api/userApi";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { userLogin } from "../../Redux/slices/UserSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdBadge,faVcard } from "@fortawesome/free-regular-svg-icons";

const Profile = () => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch()
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const userId = user._id
  const onSubmit = async () => {
    try {
      setLoading(true)
      const res = await editProfile({ ...values, userId});
      if (res?.status == 200) {
        setLoading(false)
        setIsEdit(false)
        const { user } = res.data;

        dispatch(
          userLogin({
            user: user,
          })
        );
        toast.success(res?.data?.message);
      }
    } catch (error) {
      setLoading(false)
      toast.error(error.response?.data?.message);
      console.log(error.message);
    }
  };

  const { values, handleBlur, handleChange, handleSubmit } =
    useFormik({
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
      <div class="w-full min-h-screen bg-slate-50  p-7 fade-ef">
        <h2 class="text-center mb-5 text-3xl font-bold text-green-700">
          USER PROFILE
        </h2>
        <div class="container mx-auto">
          <div>
            <div class="bg-white relative shadow w-5/6 md:w-5/6 rounded-3xl lg:w-4/6 xl:w-3/6 mx-auto p-5">
              <div class="w-52 h-52 rounded-full border-2 m-auto overflow-hidden">
                <img
                  src="/userLogo.png"
                  class="w-full h-full object-cover rounded-full"
                  alt=""
                />
              </div>
              {isEdit == false ? (
                <>
                  <div class="p-4">
                    <h1 class="font-bold text-center text-3xl text-gray-600">
                      {user.name}
                    </h1>
                    <p class="text-center text-sm text-gray-400 font-medium">
                      {user.email}
                    </p>
                    <p>
                      <span class='text-slate-700 text-md font-bold'>Wallet : ₹ {user.wallet}</span>
                    </p>

                    <div class="w-full">
                      <div class="mt-5 overflow-hidden text-sm">
                        <label
                          htmlFor="roomName"
                          className="block text-sm font-medium py-2 ms-2 text-gray-600"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          class="border rounded p-3 w-full text-slate-700"
                          value={values.name}
                          disabled
                        />
                      </div>
                      <div class="mt-5 overflow-hidden text-sm">
                        <label
                          htmlFor="roomName"
                          className="block text-sm font-medium py-2 ms-2 text-gray-600"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          class="border rounded p-3 w-full text-slate-700"
                          value={values.email}
                          disabled
                        />
                      </div>
                      <div class="mt-5 overflow-hidden text-sm">
                        <label
                          htmlFor="roomName"
                          className="block text-sm font-medium py-2 ms-2 text-gray-600"
                        >
                          Phone
                        </label>
                        <input
                          type="text"
                          class="border rounded p-3 w-full text-slate-700"
                          value={values.number}
                          disabled
                        />
                      </div>
                      <div class="mt-5  text-sm">
                        <button
                          type="button"
                          class="text-white w-full bg-blue-700 mt-2 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-3 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
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
                  <div class="p-4">
                    <h1 class="font-bold text-center text-3xl text-gray-600">
                      {user.name}
                    </h1>
                    <p class="text-center text-sm text-gray-400 font-medium">
                      {user.email}
                    </p>
                    <p>
                      <span></span>
                    </p>

                    <div class="w-full">
                      <form class="max-w-xl mx-auto" onSubmit={handleSubmit}>
                        <div class="mt-5 overflow-hidden text-sm">
                          <label
                            htmlFor="roomName"
                            className="block text-sm font-medium py-2 ms-2 text-gray-600"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            class="border rounded p-3 w-full text-slate-700"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                        <div class="mt-5 overflow-hidden text-sm">
                          <label
                            htmlFor="roomName"
                            className="block text-sm font-medium py-2 ms-2 text-gray-600"
                          >
                            Email
                          </label>
                          <input
                            type="text"
                            name="email"
                            class="border rounded p-3 w-full text-slate-700"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                        <div class="mt-5 overflow-hidden text-sm">
                          <label
                            htmlFor="roomName"
                            className="block text-sm font-medium py-2 ms-2 text-gray-600"
                          >
                            Phone
                          </label>
                          <input
                            type="number"
                            name="number"
                            class="border rounded p-3 w-full text-slate-700"
                            value={values.number}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                        <div class="mt-5 text-sm">
                          <button
                            type="submit"
                            class="text-white w-full bg-blue-700 mt-2 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-3 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
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
