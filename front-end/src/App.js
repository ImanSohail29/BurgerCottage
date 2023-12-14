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
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import ProtectedRoutesComponent from "./components/ProtectedRoutesComponent";
import HomePageComponent from "./pages/components/HomePageComponent";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ScrollToTop></ScrollToTop>
        <Header></Header>
        <Routes>
        <Route path="*" element="Page not exists 404" />
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/register" element={<RegisterPage/>}></Route>
          <Route path="/cart" element={<CartPage/>}></Route>
         <Route path="/foodItem-detail" element={<FoodItemDetailPage/>}></Route>
          <Route path="/foodItem-detail/:id" element={<FoodItemDetailPage/>}></Route>
          <Route path="/foodItem-list" element={<FoodItemsPage/>} />
          <Route path="/foodItem-list/:pageNum" element={<FoodItemsPage/>} />
          <Route path="/foodItem-list/category/:categoryName" element={<FoodItemsPage />} />
          <Route path="/foodItem-list/category/:categoryName/:pageNum" element={<FoodItemsPage />} />
        
         {/* user protected routes: */}
         <Route element={<ProtectedRoutesComponent admin={false} />}>
          <Route path="/user" element={<HomePage />} />
          <Route path="/user/my-orders" element={<HomePage />} />
          <Route path="/user/cart-details" element={<HomePage />} />
          <Route
            path="/user/order-details/:id"
            element={<HomePageComponent />}
          />
        </Route>


         {/* admin protected routes: */}
         <Route element={<ProtectedRoutesComponent admin={true} />}>
         <Route path="/admin/vendors" element={<AdminVendorsListPage></AdminVendorsListPage>}></Route>
          <Route path="/admin/create-new-vendor" element={<AdminCreateNewVendorPage></AdminCreateNewVendorPage>}></Route>
          <Route path="/admin/edit-vendor/:id" element={<AdminEditVendorPage></AdminEditVendorPage>}></Route>
          <Route path="/admin/vendors/:vendorId/" element={<AdminVendorDetailsPage></AdminVendorDetailsPage>}></Route>
          <Route path="/admin/vendors/:vendorId/add-inventoryOrder" element={<AdminAddNewInventoryOrder></AdminAddNewInventoryOrder>}></Route>
          
       </Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
