import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { ownerLogout } from "../../Redux/slices/OwnerSlice"; 
import { toast } from "react-toastify";
const OwnerProtect = (props) => {
  const dispatch = useDispatch()
  try {
    const token = localStorage.getItem("ownerToken");
    if (token) {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        // eslint-disable-next-line react/prop-types
        return props.children;
      } else {
        localStorage.removeItem("ownerToken")
        dispatch(ownerLogout())
        toast.success("You must login first");
        return <Navigate to="/owner/login" />;
      }
    } else {
      return <Navigate to="/owner/login" />;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default OwnerProtect;
