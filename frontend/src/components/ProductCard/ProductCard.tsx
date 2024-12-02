import { ProductCardProps } from "@lib/types";
import { Link } from "react-router-dom";

const ProductCard = ({
  itemId,
  itemPrice,
  itemPic,
  itemTitle,
  itemCategory,
}: ProductCardProps) => {
  return (
    <article
      id='product-card'
      className='flex flex-col border-2 pb-4 rounded-md'
    >
      <div id='item-image-container' className='border-b overflow-hidden'>
        <img
          src={itemPic}
          alt='image of the product'
          width={"100%"}
          height={"auto"}
          className='transition-all hover:scale-125'
        />
      </div>

      <div id='product-details' className='mt-10 flex justify-between px-6'>
        <div id='product-headers'>
          <Link to={`/shop/${itemCategory}/${itemId}`}>
            <h2 className='font-semibold text-xl hover:cursor-pointer hover:underline'>
              {itemTitle}
            </h2>
          </Link>

          <p className='text-gray-500 capitalize'>{itemCategory}</p>
        </div>

        <p className='self-end font-bold text-lg'>
          $<data value={itemPrice}>{itemPrice}</data>
        </p>
      </div>

      <button
        id='add-to-cart'
        className='mt-5 bg-black text-white px-2 py-2 mx-3 rounded-md transition-all border border-black hover:bg-white hover:text-black hover:border-gray-300 font-semibold active:bg-black active:text-white'
      >
        Add to Cart
      </button>
    </article>
  );
};
export default ProductCard;
