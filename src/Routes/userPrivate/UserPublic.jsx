import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { userLogout } from "../../Redux/slices/UserSlice"; 
import { toast } from "react-toastify";
const UserPublic = (props) => {
  const dispatch = useDispatch()
  try {
    const token = localStorage.getItem("userToken");
    if (token) {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        return <Navigate to="/" />;
      } else {
        localStorage.removeItem("userToken");
        dispatch(userLogout());
        <Navigate to="/login" />;
        toast.success("You must login first");
        return props.children;
      }
    } else {
      <Navigate to="/login" />;
      return props.children;
    }
  } catch (error) {
    console.log(error.message);
  }
};
export default UserPublic;
