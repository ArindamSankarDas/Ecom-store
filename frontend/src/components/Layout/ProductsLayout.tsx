import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Outlet, NavLink } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

const ProductsLayout = () => {
  const fetchCategoriesListRef = useRef(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselItemRef = useRef<HTMLButtonElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [activeOption, setActiveOption] = useState({
    selectDownItem: "all",
  });
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

  useEffect(() => {
    function checkCarouselScroll() {
      if (carouselRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = carouselRef.current;

        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
      }
    }

    checkCarouselScroll();

    const carouselElement = carouselRef.current;

    window.addEventListener("resize", checkCarouselScroll);
    if (carouselElement) {
      carouselElement.addEventListener("scroll", checkCarouselScroll);
    }

    return () => {
      window.removeEventListener("resize", checkCarouselScroll);
      if (carouselElement) {
        carouselElement.removeEventListener("scroll", checkCarouselScroll);
      }
    };
  }, [categoryList]);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current && carouselItemRef.current) {
      const scrollAmount =
        direction === "left"
          ? -carouselItemRef.current.clientWidth
          : carouselItemRef.current.clientWidth;

      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className='relative flex-1 border'>
      <header
        id='sub-header'
        className='w-full flex shadow justify-end border-b py-2 pr-5'
      >
        <section className='w-full flex justify-between items-center gap-10'>
          <div id='carousel-container' className='relative w-[70%] pl-10'>
            {showLeftArrow && (
              <button
                onClick={() => scroll("left")}
                className='absolute left-[1%] top-1/2 -translate-y-1/2 p-2 shadow-arrowShadow bg-black  rounded-full'
              >
                <ChevronLeft size={18} color='white' />
              </button>
            )}
            {showRightArrow && (
              <button
                onClick={() => scroll("right")}
                className='absolute -right-[2%] top-1/2 -translate-y-1/2 p-2 shadow-arrowShadow bg-black rounded-full'
              >
                <ChevronRight size={18} color='white' />
              </button>
            )}

            <div
              id='sub-header'
              ref={carouselRef}
              className='self-start flex items-center text-nowrap gap-3 overflow-x-auto no-scrollbar'
            >
              {categoryList.map((elem, index) => (
                <NavLink
                  key={index}
                  to={elem === "all" ? "/products/all" : `/products/${elem}`}
                >
                  {({ isActive }) => {
                    return isActive ? (
                      <span
                        id='carousel-item'
                        ref={carouselItemRef}
                        className={
                          "inline-block capitalize text-sm font-semibold rounded-2xl px-3 py-1 transition-all bg-black text-white"
                        }
                      >
                        {elem}
                      </span>
                    ) : (
                      <span
                        id='carousel-item'
                        ref={carouselItemRef}
                        className={
                          "inline-block capitalize text-sm font-semibold rounded-2xl px-3 py-1 transition-all hover:cursor-pointer hover:bg-black hover:text-white"
                        }
                        key={index}
                      >
                        {elem}
                      </span>
                    );
                  }}
                </NavLink>
              ))}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className='border-2 capitalize rounded-md px-2 py-1 flex gap-5 items-center font-semibold'>
              {activeOption.selectDownItem}
              <ChevronDown size={18} className='pt1' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='font-semibold py-2'>
              <DropdownMenuItem
                onClick={() =>
                  setActiveOption((prevActiveState) => ({
                    ...prevActiveState,
                    selectDownItem: "All",
                  }))
                }
              >
                All
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setActiveOption((prevActiveState) => ({
                    ...prevActiveState,
                    selectDownItem: "Best Selling",
                  }))
                }
              >
                Best Selling
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setActiveOption((prevActiveState) => ({
                    ...prevActiveState,
                    selectDownItem: "Customer Rating",
                  }))
                }
              >
                Customer Rating
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setActiveOption((prevActiveState) => ({
                    ...prevActiveState,
                    selectDownItem: "Price: Low to High",
                  }))
                }
              >
                Price: Low to High
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setActiveOption((prevActiveState) => ({
                    ...prevActiveState,
                    selectDownItem: "Price: High to Low",
                  }))
                }
              >
                Price: High to Low
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      </header>

      <Outlet context={activeOption} />
    </main>
  );
};
export default ProductsLayout;