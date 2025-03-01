import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import clsx from "clsx";
import { ChevronRight, Menu, Search, ShoppingCart } from "lucide-react";

import SearchBox from "@components/Search/SearchBox";
import SearchSuggestions from "@/components/Search/SearchSuggestions";

const Header = () => {
  const navigate = useNavigate();

  const [isToggled, setIsToggled] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");

  const fetchSuggestions = async (query: string) => {
    const reponse = await fetch(
      `http://localhost:3000/search?q=${query}&select=id,title,category`
    );

    if (!reponse.ok) {
      throw new Error("Something went wrong");
    }

    const result = await reponse.json();

    return result.products;
  };

  return (
    <header className='w-full sticky z-20 bg-white top-0 left-0 border-b border-black'>
      {/* search box */}
      <SearchBox
        searchToggle={isSearchActive}
        searchValue={searchInputValue}
        handleSearchToggle={setIsSearchActive}
        handleSearchInputValue={setSearchInputValue}
      />

      {/* search suggestions */}
      <SearchSuggestions
        searchValue={searchInputValue}
        searchToggle={isSearchActive}
        handleSearchToggle={setIsSearchActive}
        handleSearchInputValue={setSearchInputValue}
        fetchSuggestions={fetchSuggestions}
      />

      {/* header display */}
      <section className='relative z-10 bg-white border-b-2 border-gray-500 flex justify-between items-center px-6 py-3 lg:justify-around'>
        {/* logo and burger */}
        <div className='flex justify-center items-center gap-7 '>
          {/* burger (mobile only) */}
          <Menu
            size={27}
            className={clsx(
              "cursor-pointer transition-all lg:hidden",
              isToggled ? "rotate-90" : "rotate-0"
            )}
            onClick={() => {
              setSearchInputValue("");
              setIsToggled(!isToggled);
            }}
          />
          {/* logo */}
          <h1 className='text-xl font-bold text-white bg-black px-1 select-none lg:text-2xl'>
            Ex
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
            to='/shop'
            className={({ isActive }) => (isActive ? "stopHover" : "")}
          >
            Shop
          </NavLink>
          <NavLink
            to='/contact'
            className={({ isActive }) => (isActive ? "stopHover" : "")}
          >
            Contact
          </NavLink>
        </nav>

        {/* cart, login and search */}
        <div className='flex justify-around items-center gap-3 md:gap-6'>
          {/* search button */}
          <button
            className='p-1 lg:p-2 bg-neutral-100 rounded-full hover:cursor-pointer hover:bg-neutral-200 active:bg-neutral-100'
            onClick={() => setIsSearchActive(true)}
          >
            <Search />
          </button>

          {/* shopping cart */}
          <div className='relative z-2 top-[0%] cursor-pointer select-none transition-all hover:-top-[10%]'>
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
            className='ml-4 btn-signUp text-nowrap rounded-sm lg:inline-block'
            onClick={() => navigate("/login")}
          >
            LOGIN
          </button>
        </div>
      </section>

      {/* hidden menu (mobile only) */}
      <div
        className={clsx(
          "absolute z-5 left-0 w-full py-5 bg-gray-200 transition-all shadow-md lg:hidden",
          isToggled ? "top-full" : "-top-[100rem]"
        )}
      >
        {/* menu items */}
        <nav className='flex flex-col justify-center px-6 gap-4 nav-menu'>
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
              navigate("/shop");
            }}
          >
            Shop
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
