import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ProductGrid: React.FC<Props> = ({ children }) => {
  return <div className='card-container p-5'>{children}</div>;
};
export default ProductGrid;
