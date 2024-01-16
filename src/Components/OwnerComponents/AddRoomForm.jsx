import React from 'react';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { roomValidation } from '../../Validations/owner/roomValidation';
import { addRoom } from '../../api/ownerApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddRoomForm = () => {
  const [roomImagesError, setRoomImagesError] = useState(null);
  const navigate = useNavigate();
  const [roomImage, setRoomImage] = useState([]);
  const { _id } = useSelector((state) => state.ownerReducer.owner);
  const ownerId = _id;

  const onSubmit = async () => {
    try {
      if (roomImage.length === 0) {
        setRoomImagesError('Please select at least one image for the room.');
        return;
      }
      const res = await addRoom({ ...values, roomImage, ownerId });
      if (res?.status === 201) {
        navigate('/owner', { state: { ownerId: ownerId } });
        toast.success(res?.data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error, 'response in error');
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      roomName: '',
      rent: '',
      phone: '',
      about: '',
      location: '',
      roomType:'',
      acType:'',
    },
    validationSchema: roomValidation,
    onSubmit,
  });

  const handleRoomImagesChange = (event) => {
    const files = Array.from(event.target.files);
    const isValid = files.every(
      (file) =>
        file.type.startsWith('image/jpeg') || file.type.startsWith('image/png')
    );
    if (isValid) {
      setRoomImageToBase(files);
      setRoomImagesError(null); // Clear error if files are valid
    } else {
      setRoomImagesError(
        'Invalid file type. Please select valid image files.'
      );
      setRoomImage([]);

      event.target.value = null;
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3 p-8 bg-white rounded-lg shadow-lg mt-3 mb-3">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Add Room Form
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Your form fields go here */}
          {/* Example input field */}
          <div className="mb-4">
            <label
              htmlFor="roomName"
              className="block text-sm font-medium text-gray-600"
            >
              Room Name
            </label>
            <input
              type="text"
              id="roomName"
              name="roomName"
              value={values.roomName}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {touched.roomName && errors.roomName && (
              <div className="text-red-500 text-sm mt-1">{errors.roomName}</div>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="roomType"
              className="block text-sm font-medium text-gray-600"
            >
              Room Type
            </label>
            <select
              id="roomType"
              name="roomType"
              value={values.roomType}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 p-2 w-full border rounded-md"
            >
              <option value="" label="Select Room Type" />
              <option value="hotel" label="Hotel" />
              <option value="flat" label="Flat" />
              {/* Add more options as needed */}
            </select>
            {touched.roomType && errors.roomType && (
              <div className="text-red-500 text-sm mt-1">{errors.roomType}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              AC Type
            </label>
            <div className="mt-1 space-x-4"> 
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
                <span className="ml-2 text-sm text-gray-700">Available</span>
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
                <span className="ml-2 text-sm text-gray-700">Non-AC</span>
              </label>
            </div>
            {touched.acType && errors.acType && (
              <div className="text-red-500 text-sm mt-1">{errors.acType}</div>
            )}
          </div>
         
          <div class='flex'>
          </div>
          <div className="mb-4">
            <label
              htmlFor="roomName"
              className="block text-sm font-medium text-gray-600"
            >
              About
            </label>
            <input
              type="text"
              id="about"
              name="about"
              value={values.about}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {touched.about && errors.about && (
              <div className="text-red-500 text-sm mt-1">{errors.about}</div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="roomName"
              className="block text-sm font-medium text-gray-600"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={values.location}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {touched.location && errors.location && (
              <div className="text-red-500 text-sm mt-1">{errors.location}</div>
            )}
          </div>
          <div class='flex'>

          <div className="mb-4 me-1">
            <label
              htmlFor="roomName"
              className="block text-sm font-medium text-gray-600"
            >
              Room Rent
            </label>
            <input
              type="number"
              id="rent"
              name="rent"
              value={values.rent}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {touched.rent && errors.rent && (
              <div className="text-red-500 text-sm mt-1">{errors.rent}</div>
            )}
          </div>
          <div className="mb-4 ms-1">
            <label
              htmlFor="roomName"
              className="block text-sm font-medium text-gray-600"
            >
              Phone
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {touched.phone && errors.phone && (
              <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
            )}
          </div>
          </div>

          {/* Add other form fields similarly */}
          
          <div className="mb-4 relative">
  <label
    htmlFor="file_input"
    className="block text-sm font-medium text-gray-600"
  >
    Upload Room Images
  </label>
  <div className="mt-3 flex items-center">
    <label className="cursor-pointer bg-slate-300 text-slate-700 p-1 text-sm px-2 rounded-md hover:bg-slate-400 transition duration-300">
      Choose File
      <input
        type="file"
        id="file_input"
        accept="image/*"
        onChange={handleRoomImagesChange}
        multiple
        className="hidden"
      />
    </label>
    <span className="ml-2">{roomImage.length} file(s) selected</span>
  </div>
  {roomImagesError && (
    <div className="text-red-500 text-sm mt-1">{roomImagesError}</div>
  )}
</div>


          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300 w-full mt-4"
          >
            Add Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRoomForm;
