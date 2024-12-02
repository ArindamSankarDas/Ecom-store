import { useEffect, useRef, useState } from "react";

import ProductCard from "@components/ProductCard/ProductCard";
import { ProductItem } from "@lib/types";

import { ButtonLoading } from "@components/ui/custom-buttons";
import { Outlet, useParams } from "react-router-dom";

const ShopPage = ({ currentPath }: { currentPath: string }) => {
  const { id } = useParams();

  const didFetchRef = useRef(false);
  const [loading, setLoading] = useState({
    pageLoading: false,
    buttonLoading: false,
  });
  const [skipCount, setSkipCount] = useState(0);
  const [products, setProducts] = useState<ProductItem[]>([]);

  const fetchProductItems = async (
    url: string,
    count: number,
    newCategory: boolean
  ) => {
    try {
      setLoading((prevLoadState) => ({
        ...prevLoadState,
        [count === 0 ? "pageLoading" : "buttonLoading"]: true,
      }));

      const response = await fetch(`${url}&skip=${count}`);
      const result = await response.json();

      if (!newCategory) {
        setProducts((prevProducts) => [...prevProducts, ...result.products]);
      } else {
        setProducts(result.products);
      }
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
        "https://dummyjson.com/products?limit=11&select=title,price,thumbnail,category",
        skipCount,
        false
      );
      return () => {
        didFetchRef.current = true;
      };
    }

    if (didFetchRef.current && skipCount > 0) {
      const categorySelection =
        currentPath === "all"
          ? "https://dummyjson.com/products?limit=11&select=title,price,thumbnail,category"
          : `https://dummyjson.com/products/category/${currentPath}?limit=11&select=title,price,thumbnail,category`;

      fetchProductItems(categorySelection, skipCount, false);

      return;
    }

    if (didFetchRef.current && currentPath !== "all") {
      setSkipCount(0);
      fetchProductItems(
        `https://dummyjson.com/products/category/${currentPath}?limit=10&select=title,price,thumbnail,category`,
        skipCount,
        true
      );

      return;
    }

    if (didFetchRef.current && currentPath === "all") {
      setSkipCount(0);
      fetchProductItems(
        `https://dummyjson.com/products?limit=11&select=title,price,thumbnail,category`,
        skipCount,
        true
      );

      return;
    }
  }, [currentPath, skipCount]);

  return (
    <>
      {!id ? (
        loading.pageLoading ? (
          <section className='w-full h-[70vh] relative'>
            <div className='absolute left-[50%] -translate-x-1/2 top-[50%] -translate-y-1/2'>
              <div
                className='animate-spin inline-block size-24 border-[6px] border-current border-t-transparent text-blue-600 rounded-full'
                role='status'
                aria-label='loading'
              ></div>
            </div>
          </section>
        ) : (
          <section>
            <div className='card-container p-5'>
              {products &&
                products.map((productItem) => (
                  <ProductCard
                    key={productItem.id}
                    itemId={productItem.id}
                    itemPrice={productItem.price}
                    itemPic={productItem.thumbnail}
                    itemTitle={productItem.title}
                    itemCategory={productItem.category}
                  />
                ))}
            </div>
            {!(products.length < 11) &&
              (loading.buttonLoading ? (
                <ButtonLoading>Please wait</ButtonLoading>
              ) : (
                <button
                  className='mt-10 mb-7 relative left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1 rounded-md font-semibold border-2 border-black transition-all hover:bg-white hover:text-black active:text-white active:bg-black'
                  onClick={() => setSkipCount((prevCount) => prevCount + 11)}
                >
                  Load more
                </button>
              ))}
          </section>
        )
      ) : (
        <Outlet />
      )}
    </>
  );
};
export default ShopPage;
