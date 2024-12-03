import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  itemId: number;
  itemTitle: string;
  itemCategory: string;
  handleSearchToggle: React.Dispatch<React.SetStateAction<boolean>>;
  handleSearchInputValue: React.Dispatch<React.SetStateAction<string>>;
};

const SearchSuggestionItem: React.FC<Props> = ({
  itemId,
  itemTitle,
  itemCategory,
  handleSearchToggle,
  handleSearchInputValue,
}) => {
  const navigate = useNavigate();
  const handleSearchSuggestionClick = () => {
    navigate(`/shop/${itemCategory}/${itemId}`);
    handleSearchInputValue("");
    handleSearchToggle(false);
  };

  return (
    <div
      className='bg-white px-2 py-1 rounded-sm transition-all hover:scale-105  hover:text-white hover:bg-black hover:cursor-pointer'
      onClick={handleSearchSuggestionClick}
    >
      <h3 className='font-medium'>{itemTitle}</h3>
      <p className='text-xs font-bold mt-1'>In {itemCategory}</p>
    </div>
  );
};
export default SearchSuggestionItem;
