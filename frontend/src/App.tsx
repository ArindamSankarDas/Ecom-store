import { Routes, Route } from "react-router-dom";

import HomePage from "@pages/HomePage";

import Layout from "@components/Layout/Layout";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
};
export default App;
