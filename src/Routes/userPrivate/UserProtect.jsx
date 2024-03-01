import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userLogout } from "../../Redux/slices/UserSlice"; 
function UserProtect(props) {
  const dispatch = useDispatch();
  try {
    const token = localStorage.getItem("userToken");
    if (token) {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        // eslint-disable-next-line react/prop-types
        return props.children;
      } else {
        localStorage.removeItem("userToken");
        dispatch(userLogout());
        toast.success("You must login first");
        return <Navigate to="/login" />;
      }
    } else {
      toast.success("You have login first");
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.log(error.message);
  }
}

export default UserProtect;
