import AdminStocksPageComponent from "./components/AdminStocksComponent";

import axios from "axios";
const getStocks = async() => {
    const { data } = await axios.get("/api/stocks/admin");
    return data
}
const deleteStocks=async(stockId)=>{
    const {data}=await axios.delete(`/api/stocks/admin/${stockId}`)
    return data
}

const AdminStocksPage=()=>{
    return <AdminStocksPageComponent getStocks={getStocks} deleteStock={deleteStocks}></AdminStocksPageComponent>
}
export default AdminStocksPage;