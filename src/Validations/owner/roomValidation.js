import * as yup from "yup";

export const roomValidation = yup.object().shape({
  roomName: yup
    .string()
    .max(20)
    .test("notOnlySpaces", "Room name is required", (value) => {
      return value.trim() !== "";
    })
    .required("Room name is required"),
  rent: yup
    .number("rent must be a number")
    .required("rent is required")
    .positive("rent must be positive"),
  phone: yup.number().min(10).required("Enter 10 digit").positive("Enter right number"),
  about: yup.string().max(25).test("notOnlySpaces", "About room is required", (value) => {
    return value.trim() !== "";
  }).required("about the room is required"),
  roomType: yup.string().required("Room type required"),
  model: yup.string().required("Room model required")
});
