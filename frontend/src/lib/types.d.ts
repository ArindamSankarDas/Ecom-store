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

export type ProductItemPageDetails = {
  images: string[];
  title: string;
  reviews: {
    rating: number;
  }[];
  availabilityStatus: "In Stock" | "Low Stock" | "No Stock";
  price: number;
  description: string;
  returnPolicy: string;
  warrantyInformation: string;
  shippingInformation: string;
};
