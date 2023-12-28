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
import AdminCartDetailsPage from "./pages/admin/billing/AdminCartDetailsPage";
import AdminOrderDetailsPage from "./pages/admin/billing/AdminOrderDetailsPage";
import AdminOrdersPage from "./pages/admin/billing/AdminOrdersPage";
import EditUserPage from "./pages/EditUserPage";
import AdminCreateProductPage from "./pages/admin/billing/AdminAddNewProductPage";
import AdminAddNewCategoryPage from "./pages/admin/billing/AdminAddNewCategoryPage";
import AdminProductsPage from "./pages/admin/billing/AdminProductsPage";
import AdminEditProductPage from "./pages/admin/billing/AdminEditProductPage";
import AdminEditCategoryPage from "./pages/admin/billing/AdminEditCategoryPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ScrollToTop></ScrollToTop>
        <Header></Header>
        <Routes>
        <Route element={<ProtectedRoutesComponent admin={true} />}>
        <Route path="/home" element={<HomePage/>}></Route>
         <Route path="/admin/vendors" element={<AdminVendorsListPage></AdminVendorsListPage>}></Route>
          <Route path="/admin/create-new-vendor" element={<AdminCreateNewVendorPage></AdminCreateNewVendorPage>}></Route>
          <Route path="/admin/edit-vendor/:id" element={<AdminEditVendorPage></AdminEditVendorPage>}></Route>
          <Route path="/admin/vendors/:vendorId/" element={<AdminVendorDetailsPage></AdminVendorDetailsPage>}></Route>
          <Route path="/admin/vendors/:vendorId/add-inventoryOrder" element={<AdminAddNewInventoryOrder></AdminAddNewInventoryOrder>}></Route>
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/admin/products/category/:categoryName" element={<AdminProductsPage />} />
          <Route
            path="/admin/order-details/:orderId"
            element={<AdminOrderDetailsPage />}
          />
          <Route
            path="/admin/create-new-product"
            element={<AdminCreateProductPage />}
          />
          <Route
            path="/admin/edit-product/:id"
            element={<AdminEditProductPage />}
          />
           <Route
            path="/admin/create-new-category"
            element={<AdminAddNewCategoryPage />}
          />
          <Route
            path="/admin/edit-category/:id"
            element={<AdminEditCategoryPage />}
          />
          <Route path="/admin/"></Route>
          
       </Route>
        <Route path="*" element="Page not exists 404" />
          <Route path="/" element={<FoodItemsPage/>}></Route>
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
          <Route path="/user" element={<EditUserPage />} />
          <Route path="/user/my-orders" element={<HomePage />} />
          <Route path="/user/cart-details" element={<AdminCartDetailsPage />} />
          </Route>


         {/* admin protected routes: */}
         
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
