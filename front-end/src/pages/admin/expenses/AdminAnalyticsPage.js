import AdminAnalyticsPageComponent from "./components/AdminAnalyticsPageComponent";
import axios from "axios";
import socketIOClient from "socket.io-client";

const fetchOrdersForFirstDate = async (abctrl, firstDateToCompare) => {
    const { data } = await axios.get("/api/orders/admin/analysis/" + firstDateToCompare, {
    signal: abctrl.signal,
  });
  return data;
}

const fetchOrdersForSecondDate = async (abctrl, secondDateToCompare) => {
  const { data } = await axios.get("/api/orders/admin/analysis/" + secondDateToCompare, {
    signal: abctrl.signal,
  });
  return data;
};

const AdminAnalyticsPage = () => {
  return <AdminAnalyticsPageComponent fetchOrdersForFirstDate={fetchOrdersForFirstDate} fetchOrdersForSecondDate={fetchOrdersForSecondDate} socketIOClient={socketIOClient} />;
};

export default AdminAnalyticsPage;
