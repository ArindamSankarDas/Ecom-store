import React, { ReactElement } from "react";

type Props = {
  children: ReactElement;
};

const ProductGrid: React.FC<Props> = ({ children }) => {
  return <div className='card-container p-5'>{children}</div>;
};
export default ProductGrid;
