import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import Card from "@components/Card/Card";
import { ProductItem } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { ButtonLoading } from "@/components/ui/custom-buttons";

const ProductsPage = () => {
  const didFetchRef = useRef(false);
  const [activeOption, setActiveOption] = useState("All");
  const [loading, setLoading] = useState({
    pageLoading: false,
    buttonLoading: false,
  });
  const [skipCount, setSkipCount] = useState(0);
  const [products, setProducts] = useState<ProductItem[]>([]);

  const fetchProductItems = async (url: string, count: number) => {
    try {
      setLoading((prevLoadState) => ({
        ...prevLoadState,
        [count === 0 ? "pageLoading" : "buttonLoading"]: true,
      }));

      const response = await fetch(`${url}&skip=${count}`);
      const result = await response.json();

      setProducts((prevProducts) => [...prevProducts, ...result.products]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading({
        pageLoading: false,
        buttonLoading: false,
      });
    }
  };

  useEffect(() => {
    if (!didFetchRef.current) {
      fetchProductItems(
        "https://dummyjson.com/products?limit=10&select=title,price,thumbnail,category",
        skipCount
      );

      return () => {
        didFetchRef.current = true;
      };
    }

    if (didFetchRef.current && skipCount > 0) {
      fetchProductItems(
        "https://dummyjson.com/products?limit=10&select=title,price,thumbnail,category",
        skipCount
      );
    }
  }, [skipCount]);

  return (
    <main className='relative flex-1 border'>
      <header
        id='sub-header'
        className='flex shadow justify-end border-b py-2 pr-5'
      >
        <DropdownMenu>
          <DropdownMenuTrigger className='border-2 rounded-md px-2 py-1 flex gap-5 items-center font-semibold'>
            {activeOption}
            <ChevronDown size={18} className='pt1' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='font-semibold py-2'>
            <DropdownMenuItem onClick={() => setActiveOption("All")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveOption("Best Selling")}>
              Best Selling
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setActiveOption("Customer Rating")}
            >
              Customer Rating
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setActiveOption("Price: Low to High")}
            >
              Price: Low to High
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setActiveOption("Price: High to Low")}
            >
              Price: High to Low
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {loading.pageLoading ? (
        <section className='w-fit absolute top-[45%] -translate-y-1/2 left-1/2 -translate-x-1/2'>
          <div
            className='animate-spin inline-block size-24 border-[6px] border-current border-t-transparent text-blue-600 rounded-full'
            role='status'
            aria-label='loading'
          ></div>
        </section>
      ) : (
        <section>
          <div className='card-container p-5'>
            {products &&
              products.map((productItem, index) => (
                <Card
                  key={index}
                  itemPrice={productItem.price}
                  itemPic={productItem.thumbnail}
                  itemTitle={productItem.title}
                  itemCategory={productItem.category}
                />
              ))}
          </div>

          {loading.buttonLoading ? (
            <ButtonLoading>Please wait</ButtonLoading>
          ) : (
            <button
              className='mt-10 mb-7 relative left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1 rounded-md font-semibold border-2 border-black transition-all hover:bg-white hover:text-black active:text-white active:bg-black'
              onClick={() => setSkipCount((prevCount) => prevCount + 10)}
            >
              Load more
            </button>
          )}
        </section>
      )}
    </main>
  );
};
export default ProductsPage;
