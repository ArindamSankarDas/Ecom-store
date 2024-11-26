import { Routes, Route } from "react-router-dom";

import AppLayout from "@components/Layout/AppLayout";

import HomePage from "@pages/HomePage";
import ContactPage from "@pages/ContactPage";
import CartPage from "@pages/CartPage";
import WishlistPage from "@pages/WishlistPage";
import LoginPage from "@pages/LoginPage";
import ProductsPage from "@pages/ProductsPage";
import ProductsLayout from "./components/Layout/ProductsLayout";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path='products' element={<ProductsLayout />}>
          <Route index element={<ProductsPage />} />
        </Route>
        <Route path='contact' element={<ContactPage />} />
        <Route path='cart' element={<CartPage />} />
        <Route path='wishlist' element={<WishlistPage />} />
        <Route path='login' element={<LoginPage />} />
      </Route>
    </Routes>
  );
};
export default App;
