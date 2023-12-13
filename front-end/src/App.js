import {BrowserRouter,Routes,Route} from "react-router-dom"

import './App.css';
import ScrollToTop from "./utils/ScrollToTop";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import AdminVendorsListPage from "./pages/admin/vendor/AdminVendorsListPage";
import AdminEditVendorPage from "./pages/admin/vendor/AdminEditVendorPage";
import AdminCreateNewVendorPage from "./pages/admin/vendor/AdminCreateNewVendorPage";
import AdminAddNewInventoryOrder from "./pages/admin/vendor/AdminAddNewInventoryOrder";
import AdminVendorDetailsPage from "./pages/admin/vendor/AdminVendorDetailsPage";
import FoodItemDetailPage from "./pages/FoodItemDetailPage";
import FoodItemsPage from "./pages/FoodItemsPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ScrollToTop></ScrollToTop>
        <Header></Header>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/admin/vendors" element={<AdminVendorsListPage></AdminVendorsListPage>}></Route>
          <Route path="/admin/create-new-vendor" element={<AdminCreateNewVendorPage></AdminCreateNewVendorPage>}></Route>
          <Route path="/admin/edit-vendor/:id" element={<AdminEditVendorPage></AdminEditVendorPage>}></Route>
          <Route path="/admin/vendors/:vendorId/" element={<AdminVendorDetailsPage></AdminVendorDetailsPage>}></Route>
          <Route path="/admin/vendors/:vendorId/add-inventoryOrder" element={<AdminAddNewInventoryOrder></AdminAddNewInventoryOrder>}></Route>
          <Route path="/foodItem-detail" element={<FoodItemDetailPage/>}></Route>
          <Route path="/foodItem-detail/:id" element={<FoodItemDetailPage/>}></Route>
          <Route path="/foodItem-list" element={<FoodItemsPage/>} />
          <Route path="/foodItem-list/:pageNum" element={<FoodItemsPage/>} />
          <Route path="/foodItem-list/category/:categoryName" element={<FoodItemsPage />} />
          <Route path="/foodItem-list/category/:categoryName/:pageNum" element={<FoodItemsPage />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
