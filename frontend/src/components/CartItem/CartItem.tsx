import { Button } from "@components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

const CartItem = () => {
  return (
    <div
      id='cart-item'
      className='border-2 rounded-md p-5 flex justify-start items-center gap-3'
    >
      <img
        src='https://plus.unsplash.com/premium_photo-1733230677536-ebd9121658ce?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        alt='cart-item-image'
        width={120}
        height={120}
        className='rounded-md'
      />
      <div className='w-full'>
        <h3 className='font-medium'>Essence Mascara Lash Princess</h3>
        <p className='text-sm font-semibold text-gray-500'>Beauty</p>{" "}
        <div className='self-end flex justify-between items-center mt-2'>
          <span className='font-bold'>$9.99</span>
          <div className='flex justify-center items-center gap-2'>
            <div className='w-fit flex justify-center items-center gap-4 border rounded-lg'>
              <button className='border-r py-1 px-2 rounded-tl-lg rounded-bl-lg hover:bg-slate-50 active:bg-white'>
                <Minus size={18} />
              </button>

              <span className='font-semibold select-none'>12</span>

              <button className='border-l py-1 px-2 rounded-tr-lg rounded-br-lg hover:bg-slate-50 active:bg-white'>
                <Plus size={18} />
              </button>
            </div>
            <Button variant='ghost' size='icon'>
              <Trash2 className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartItem;
