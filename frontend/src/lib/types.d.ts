export type ProductItem = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  category: string;
};

export type SearchItem = {
  id: number;
  title: string;
  category: string;
};

export type ProductItemDetails = {
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
