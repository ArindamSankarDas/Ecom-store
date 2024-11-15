import { Routes, Route } from "react-router-dom";

import HomePage from "@pages/HomePage";
import AboutPage from "@pages/AboutPage";
import ContactPage from "@pages/ContactPage";

import Layout from "@components/Layout/Layout";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='about' element={<AboutPage />} />
        <Route path='contact' element={<ContactPage />} />
      </Route>
    </Routes>
  );
};
export default App;
