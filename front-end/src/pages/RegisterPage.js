import RegisterPageComponent from "./components/RegisterPageComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/userSlice";

const registerUserApiRequest = async (name, phoneNumber,password) => {
  console.log(name,phoneNumber,password)
  const { data } = await axios.post("/api/users/register", {
    name, phoneNumber,password
  });
  sessionStorage.setItem("userInfo", JSON.stringify(data.userCreated));
  if (data.success === "User created") window.location.href = "/user";
  return data;
};

const RegisterPage = () => {
  const reduxDispatch = useDispatch();
  return (
    <RegisterPageComponent
      registerUserApiRequest={registerUserApiRequest}
      reduxDispatch={reduxDispatch}
      loginAction={login}
    />
  );
};

export default RegisterPage;
