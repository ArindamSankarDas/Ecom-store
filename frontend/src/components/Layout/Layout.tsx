import { Outlet } from "react-router-dom";

import Header from "@components/Header/Header";

const Layout = () => {
  return (
    <div id='layout' className='w-screen min-h-screen flex flex-col'>
      <Header />
      <Outlet />
    </div>
  );
};
export default Layout;
