import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/slices/userSlice";
import EditUserPageComponent from "./components/EditUserPageComponent";

const updateUserApiRequest = async (
  name,
  phoneNumber,
  address,
  password
) => {
  const { data } = await axios.put("/api/users/profile", {
    name,
    phoneNumber,
    address,
    password,
  });
  return data;
};

const fetchUser = async (id) => {
  const { data } = await axios.get("/api/users/profile/" + id);
  return data;
};

const EditUserPage = () => {
  const reduxDispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  return (
    <EditUserPageComponent
      updateUserApiRequest={updateUserApiRequest}
      fetchUser={fetchUser}
      userInfoFromRedux={userInfo}
      reduxDispatch={reduxDispatch}
      login={login}
      localStorage={window.localStorage}
      sessionStorage={window.sessionStorage}
    />
  );
};

export default EditUserPage;
