import { ProductCardProps } from "@lib/types";

const Card = ({
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
      <img
        src={itemPic}
        alt='test image'
        width={"100%"}
        height={"auto"}
        className='border-b'
      />

      <div id='product-details' className='mt-10 flex justify-between px-6'>
        <div id='product-headers'>
          <h2 className='font-semibold text-xl'>{itemTitle}</h2>
          <p className='text-gray-500 capitalize'>{itemCategory}</p>
        </div>

        <p className='self-end font-bold text-lg'>
          $<data value={itemPrice}>{itemPrice}</data>
        </p>
      </div>

      <button className='mt-5 bg-black text-white px-2 py-2 mx-3 rounded-md transition-all border border-black hover:bg-white hover:text-black hover:border-gray-300 font-semibold active:bg-black active:text-white'>
        Add to Cart
      </button>
    </article>
  );
};
export default Card;
