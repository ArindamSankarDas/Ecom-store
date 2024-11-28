import { useEffect, useRef, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "@components/Layout/AppLayout";
import ProductsLayout from "@components/Layout/ProductsLayout";

import HomePage from "@pages/HomePage";
import ContactPage from "@pages/ContactPage";
import CartPage from "@pages/CartPage";
import LoginPage from "@pages/LoginPage";
import ProductsPage from "@pages/ProductsPage";
import ProductItemPage from "@pages/ProductItemPage";

const App = () => {
  const fetchCategoriesListRef = useRef(false);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const fetchCategoriesList = async () => {
    try {
      const response = await fetch(
        "https://dummyjson.com/products/category-list"
      );

      const result = await response.json();

      setCategoryList(["all", ...result]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!fetchCategoriesListRef.current) {
      fetchCategoriesList();

      return () => {
        fetchCategoriesListRef.current = true;
      };
    }
  }, []);
  return (
    <Routes>
      {/* Main layout for WebApp altogether */}
      <Route path='/' element={<AppLayout />}>
        {/* Routes to the main page on load, i.e. HomePage(/) */}
        <Route index element={<HomePage />} />
        {/* Routes to the Products(/products) route which has another layout on top of AppLayout  */}
        <Route
          path='products'
          element={<ProductsLayout categoryList={categoryList} />}
        >
          {/* Reroutes it to /products/all using Navigate to replace the history stack  */}
          <Route index element={<Navigate to='all' replace />} />
          {/* Dynamic routing of the product category(/products/category) which is received from the categoryList */}
          {categoryList.map((routeElem, index) => (
            <Route
              key={index}
              path={routeElem}
              element={<ProductsPage currentPath={routeElem} />}
            >
              {/* Route for single product(/products/category/:id) items using product id  */}
              <Route index path=':id' element={<ProductItemPage />} />
            </Route>
          ))}
        </Route>
        {/* Routes to the contact when clicked on, i.e. ContactPage(/contact) */}
        <Route path='contact' element={<ContactPage />} />
        {/* Routes to the cart when clicked on, i.e. CartPage(/cart) */}
        <Route path='cart' element={<CartPage />} />
        {/* Routes to the login when clicked on, i.e. LoginPage(/login) */}
        <Route path='login' element={<LoginPage />} />
      </Route>
    </Routes>
  );
};
export default App;
