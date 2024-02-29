import axios from "axios";
import AdminCustomersComponent from "./components/AdminCustomersComponent";
const fetchCustomers=async(abctrl)=>{
    const {data}=await axios.get("/api/users/admin/",{signal:abctrl.signal})
    return data
}
const AdminCustomersPage =() => {
    const abctrl=""
return <AdminCustomersComponent fetchCustomers={()=>fetchCustomers(abctrl)}></AdminCustomersComponent>
};
export default AdminCustomersPage;