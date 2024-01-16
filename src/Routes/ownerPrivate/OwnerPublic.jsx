import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { ownerLogout } from "../../Redux/slices/OwnerSlice";
import { toast } from "react-toastify";
const OwnerPublic = (props) => {
  const dispatch = useDispatch()
  try {
    const token = localStorage.getItem("ownerToken");
    if (token) {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        return <Navigate to="/owner" />;
      } else {
        localStorage.removeItem("ownerToken")
        dispatch(ownerLogout())
        toast.success("You must login first");
        <Navigate to="/owner/login" />;
        return props.children;
      }
    } else {
      <Navigate to="/owner/login" />;
      return props.children;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default OwnerPublic;
