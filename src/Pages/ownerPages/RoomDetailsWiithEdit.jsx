import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import OwnerNavbar from "../../Components/OwnerComponents/OwnerNavbar";
import { useFormik } from "formik";
import { roomValidation } from "../../Validations/owner/roomValidation";
import { editRoom } from "../../api/ownerApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { deleteSingleImage } from "../../api/ownerApi";
import { myRoom } from "../../api/ownerApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import OwnerFooter from "../../Components/OwnerComponents/OwnerFooter";
import Spinner from "../../Components/common/Spinner";
import { Autocomplete } from "@react-google-maps/api";

const RoomDetailsWithEdit = () => {
  const [room, setRoom] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);
  const [roomImagesError, setRoomImagesError] = useState(null);
  const [roomImage, setRoomImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const x = location.state;
  const [save, setSave] = useState("Save");
  const roomId = x._id;
  useEffect(() => {
    myRoom(roomId)
      .then((res) => {
        setRoom(res?.data?.room);
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.response?.data?.message);
      });
  }, [roomId]);

  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      console.log("ioioio")
      setLoading(true);
      setSave("Saving...");
      const res = await editRoom({
        ...values,
        roomId,
        roomImage,
      });

      if (res?.status === 200) {
        setSave("Save");
        setLoading(false);
        toast.success(res?.data?.message);
        navigate("/owner", { state: { ownerId: x.ownerId } });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
      console.log(error.message);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        roomName: room.roomName,
        about: room.about,
        phone: room.phone,
        location: room.location,
        rent: room.rent,
        acType: room.acType,
        roomType: room.roomType,
        model: room.model

      },
      validationSchema: roomValidation,
      onSubmit,
      enableReinitialize: true,
    });

  const handleRoomImagesChange = (event) => {
    const files = Array.from(event.target.files);
    const isValid = files.every(
      (file) =>
        file.type.startsWith("image/jpeg") || file.type.startsWith("image/png")
    );
    if (isValid) {
      setRoomImageToBase(files);
      setRoomImagesError(null);
    } else {
      setRoomImagesError("Invalid file type. Please select valid image files.");
      setRoomImage([]);
      event.target.value = null;
    }
    const newImages = files.map((file) => URL.createObjectURL(file));
    const allImages = [...newImages, ...room.roomImages];
    setSelectedImages(allImages);
  };

  const handleDeleteImage = async (imageSrc) => {
    try {
      setLoading(true);
      const res = await deleteSingleImage(imageSrc, roomId);
      if (res.status === 200) {
        toast.success(res?.data?.message);
        setRoom(res?.data?.updatedData);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
      console.log(error.message);
    }
  };

  const setRoomImageToBase = async (files) => {
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onloadend = () => {
        setRoomImage((prev) => [...prev, reader.result]);
      };
    }
  };
  return (
    <div>
      <OwnerNavbar />
      <section class="overflow-hidden bg-slate-50 min-h-screen py-11 font-poppins dark:bg-black-800 fade-ef">
        <div class="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
          <div class="m-auto">
            {room.roomImages ? (
              <>
                <div class="w-full px-4 md:w-1/2 m-auto ">
                  <div class="sticky top-0 z-50 overflow-hidden ">
                    <div class="relative mb-6 lg:mb-10 lg:h-2/4 m-auto">
                      <img
                        src={room.roomImages[0]}
                        alt=""
                        class="object-cover m-auto rounded-2xl"
                        style={{ height: 500 }}
                      />
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-3/4 m-auto border rounded-2xl bg-slate-200 mt-7">
                  <h3 class="text-center mt-5 font-medium text-xl text-gray-700">
                    Edit the Room
                  </h3>
                  <div class="lg:pl-3">
                    <div class="mb-8">
                      <form class="max-w-xl mx-auto" onSubmit={handleSubmit}>
                        <div class="mb-2">
                          <label
                            for="email"
                            class="block mb-2 mt-5 text-sm font-medium text-gray-400"
                          >
                            Room Name
                          </label>
                          <input
                            type="text"
                            class="bg-red-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-slate-100 dark:border-gray-300 dark:placeholder-gray-700 dark:text-slate-500 dark:focus:ring-gray-500 dark:focus:border-blue-500"
                            name="roomName"
                            required=""
                            value={values.roomName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Room Name"
                          />
                        </div>

                        <div className="mb-4">
                          <label
                            for="email"
                            class="block mb-2 mt-5 text-sm font-medium text-gray-400"
                          >
                            Room Type
                          </label>
                          <select
                            id="roomType"
                            name="roomType"
                            value={values.roomType}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="bg-red-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-slate-100 dark:border-gray-300 dark:placeholder-gray-700 dark:text-slate-500 dark:focus:ring-gray-500 dark:focus:border-blue-500"
                          >
                            <option value="" label="Select Room Type" />
                            <option value="hotel" label="Hotel" />
                            <option value="flat" label="Flat" />
                            {/* Add more options as needed */}
                          </select>
                          {touched.roomType && errors.roomType && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.roomType}
                            </div>
                          )}
                        </div>

                        <div className="mb-4">
                          <label
                            for="email"
                            class="block mb-2 mt-5 text-sm font-medium text-gray-400"
                          >
                            Model
                          </label>
                          <select
                            id="roomType"
                            name="roomType"
                            value={values.model}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="bg-red-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-slate-100 dark:border-gray-300 dark:placeholder-gray-700 dark:text-slate-500 dark:focus:ring-gray-500 dark:focus:border-blue-500"
                          >
                            <option value="" label="Select Room Model" />
                            <option value="Normal" label="Normal" />
                            <option value="Medium" label="Medium" />
                            <option value="Luxury" label="Luxury" />
                            {/* Add more options as needed */}
                          </select>
                          {touched.roomType && errors.roomType && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.roomType}
                            </div>
                          )}
                        </div>

                        <label
                          for="email"
                          class="block mb-2 mt-5 text-sm font-medium text-gray-400"
                        >
                          AC Type
                        </label>

                        <div className="mt-1 space-x-4 mt-3">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              id="acYes"
                              name="acType"
                              value="AC"
                              checked={values.acType === "AC"}
                              onChange={handleChange}
                              className="form-radio h-4 w-4 text-slate-600"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              Available
                            </span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              id="acNo"
                              name="acType"
                              value="Non-AC"
                              checked={values.acType === "Non-AC"}
                              onChange={handleChange}
                              className="form-radio h-4 w-4 text-slate-600"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              Non-AC
                            </span>
                          </label>
                        </div>

                        <div class="mb-1">
                          <label
                            for="email"
                            class="block mb-2 mt-5 text-sm font-medium text-gray-400"
                          >
                            About
                          </label>
                          <input
                            type="text"
                            id="about"
                            class="bg-red-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gra-500 block w-full p-2.5 dark:bg-slate-100 dark:border-gray-300 dark:placeholder-gray-400 dark:text-slate-500 dark:focus:ring-gray-500 dark:focus:border-blue-500"
                            value={values.about}
                            required=""
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                        <div class="flex">
                          <div class="mb-1 me-1">
                            <label
                              for="email"
                              class="block mb-2 mt-5 text-sm font-medium text-gray-400"
                            >
                              Rent
                            </label>
                            <input
                              type="number"
                              name="rent"
                              id="f"
                              class="bg-red-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gra-500 block w-50 p-2.5 dark:bg-slate-100 dark:border-gray-300 dark:placeholder-gray-400 dark:text-slate-500 dark:focus:ring-gray-500 dark:focus:border-blue-500"
                              value={values.rent}
                              required=""
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>

                          <div class="mb-1 ms-1">
                            <label
                              for="email"
                              class="block mb-2 mt-5 text-sm font-medium text-gray-400"
                            >
                              Phone
                            </label>
                            <input
                              type="number"
                              name="phone"
                              id="about"
                              class="bg-red-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gra-500 block w-50 p-2.5 dark:bg-slate-100 dark:border-gray-300 dark:placeholder-gray-400 dark:text-slate-500 dark:focus:ring-gray-500 dark:focus:border-blue-500"
                              value={values.phone}
                              required=""
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div>

                        <div class="mb-5">
                          <label
                            for="email"
                            class="block mb-2 mt-5 text-sm font-medium text-gray-400"
                          >
                            location
                          </label>
                          <input
                            type="text"
                            id="location"
                            name="location"
                            class="bg-red-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gra-500 block w-72 p-2.5 dark:bg-slate-100 dark:border-gray-300 dark:placeholder-gray-400 dark:text-slate-500 dark:focus:ring-gray-500 dark:focus:border-blue-500"
                            value={values.location}
                            required=""
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                        <div class="mb-5">
                          <label
                            for="email"
                            class="block mb-2 mt-5 text-sm font-medium text-gray-400"
                          >
                            Add new image
                          </label>
                          <input
                            type="file"
                            id="location"
                            name="location"
                            class="bg-red-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gra-500 block w-72 p-2.5 dark:bg-slate-100 dark:border-gray-300 dark:placeholder-gray-400 dark:text-slate-500 dark:focus:ring-gray-500 dark:focus:border-blue-500"
                            onChange={handleRoomImagesChange}
                            accept="image/*"
                            multiple
                          />
                        </div>

                        <div class="flex-wrap md:flex border">
                          {room.roomImages.map((img) => (
                            <div class="w-1/2 p-2 sm:w-1/4 m-auto relative">
                              <a class="block border-green-300 dark:border-transparent">
                                <img
                                  src={img}
                                  alt=""
                                  class="object-cover w-full lg:h-20 m-auto"
                                />
                              </a>
                              {room.roomImages.length > 1 ? (
                                <>
                                  <div class="text-center mt-2">
                                    <button
                                      className=" overflow-hidden text-sm font-medium text-gray-900 rounded-lg group hover:text-slate-50 hover:border dark:text-slate-900 focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                                      onClick={() => handleDeleteImage(img)}
                                    >
                                      <span className="transition-all hover:text-slate-600 ease-in duration-75 text-slate-900  rounded-3xl group-hover:bg-opacity-0">
                                        <FontAwesomeIcon icon={faTrash} />
                                      </span>
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                          ))}
                        </div>

                        <button
                          type="submit"
                          class="text-white bg-gray-700 hover:bg-green-800 mt-2 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                        >
                          {save}
                        </button>
                      </form>
                    </div>

                    <div class="w-32 mb-8 "></div>
                  </div>
                </div>
              </>
            ) : (
              <div class='m-auto text-center flex justify-center'>
                <Spinner/>
              </div>
            )}
          </div>
        </div>
      </section>
      <OwnerFooter />
    </div>
  );
};

export default RoomDetailsWithEdit;
