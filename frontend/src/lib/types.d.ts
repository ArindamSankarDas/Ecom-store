export type ProductItem = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  category: string;
};

export type ProductCardProps = {
  itemId: number;
  itemPrice: number;
  itemPic: string;
  itemTitle: string;
  itemCategory: string;
};