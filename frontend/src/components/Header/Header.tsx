import { useState } from "react";
import clsx from "clsx";
import { ChevronRight, Heart, Menu, Search, ShoppingCart } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [isToggled, setIsToggled] = useState(false);

  const navigate = useNavigate();

  return (
    <header className='sticky top-0 left-0 w-full'>
      {/* header display */}
      <section className='relative z-10 bg-white shadow-md flex justify-between items-center px-6 py-3 lg:justify-around'>
        {/* logo and burger */}
        <div className='flex justify-center items-center gap-7 '>
          {/* burger (mobile only) */}
          <Menu
            size={33}
            className='cursor-pointer lg:hidden'
            onClick={() => setIsToggled(!isToggled)}
          />
          {/* logo */}
          <h1 className='text-xl font-bold text-white bg-black px-1 select-none lg:text-2xl'>
            Exclusive
          </h1>
        </div>

        {/* nav menu items (desk only) */}
        <nav className='hidden lg:nav-menu-desk '>
          <NavLink
            to='/'
            className={({ isActive }) => (isActive ? "stopHover" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to='/products'
            className={({ isActive }) => (isActive ? "stopHover" : "")}
          >
            Products
          </NavLink>
          <NavLink
            to='/contact'
            className={({ isActive }) => (isActive ? "stopHover" : "")}
          >
            Contact
          </NavLink>
        </nav>

        {/* cart, wishlist and login box, search in desk */}
        <div className='flex justify-around items-center gap-4'>
          {/* desk search */}
          <div className='hidden mr-10 lg:block relative w-[300px] self-center'>
            <input
              className='w-full text-base px-3 py-2 text-black bg-[#F5F5F5] rounded-md placeholder:text-gray-600 placeholder:font-semibold placeholder:text-sm'
              type='search'
              name='searchBox'
              id='searchBox'
              placeholder='What are you looking for?'
            />

            <Search
              className='absolute top-1/2 right-2 -translate-y-1/2'
              size={22}
              strokeWidth={3}
            />
          </div>

          {/* wishlist */}
          <NavLink
            to={"/wishlist"}
            className='relative top-[0%] cursor-pointer transition-all hover:-top-[10%] hover:scale-105'
          >
            {({ isActive }) =>
              isActive ? (
                <Heart size={22} fill='red' strokeWidth={0} />
              ) : (
                <Heart size={22} />
              )
            }
          </NavLink>

          {/* shopping cart */}
          <div className='relative top-[0%] cursor-pointer select-none transition-all hover:-top-[10%]'>
            <span className='absolute -top-2 -right-2 text-[12px] bg-red-600 font-semibold text-white py-[0.90px] px-[6px] rounded-full'>
              6
            </span>
            <NavLink to={"/cart"}>
              {({ isActive }) =>
                isActive ? (
                  <ShoppingCart size={22} fill='black' />
                ) : (
                  <ShoppingCart size={22} fill='transparent' />
                )
              }
            </NavLink>
          </div>

          {/* login */}
          <button
            className='ml-4 btn-signUp text-nowrap lg:inline-block'
            onClick={() => navigate("/login")}
          >
            LOGIN
          </button>
        </div>
      </section>

      {/* hidden menu (mobile only) */}
      <div
        className={clsx(
          "absolute z-5 flex flex-col gap-8 left-0 w-full py-10 bg-gray-200 transition-all lg:hidden",
          isToggled ? "top-full" : "-top-[100rem]"
        )}
      >
        {/* search box */}
        <div className='relative w-4/5 self-center'>
          <input
            className='w-full text-lg px-3 py-2 rounded-md placeholder:italic'
            type='search'
            name='searchBox'
            id='searchBox'
            placeholder='What are you looking for?'
          />

          <Search
            className='absolute top-1/2 right-4 -translate-y-1/2'
            size={26}
            strokeWidth={3}
          />
        </div>

        {/* menu items */}
        <nav className='flex flex-col justify-center px-6 gap-y-1 nav-menu'>
          <span
            onClick={() => {
              setIsToggled(false);
              navigate("/");
            }}
          >
            Home
            <ChevronRight />
          </span>
          <span
            onClick={() => {
              setIsToggled(false);
              navigate("/products");
            }}
          >
            Products
            <ChevronRight />
          </span>
          <span
            onClick={() => {
              setIsToggled(false);
              navigate("/contact");
            }}
          >
            Contact
            <ChevronRight />
          </span>
        </nav>
      </div>
    </header>
  );
};

export default Header;
