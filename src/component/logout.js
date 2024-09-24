import { Navigate } from "react-router-dom";
import { logout } from "../service/AuthService";

function Logout(){
    logout();
      alert("Logged out Successfully!")
      Navigate('/');
}

export default Logout