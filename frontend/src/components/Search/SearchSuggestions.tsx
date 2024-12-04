import React, { useEffect, useState } from "react";
import clsx from "clsx";

import SearchSuggestionItem from "@components/Search/SearchSuggestionItem";

import { SearchItem } from "@lib/types";

type Props = {
  searchToggle: boolean;
  searchValue: string;
  handleSearchToggle: React.Dispatch<React.SetStateAction<boolean>>;
  handleSearchInputValue: React.Dispatch<React.SetStateAction<string>>;
  fetchSuggestions: (query: string) => Promise<SearchItem[]>;
};

const SearchSuggestions: React.FC<Props> = ({
  searchToggle,
  searchValue,
  fetchSuggestions,
  handleSearchToggle,
  handleSearchInputValue,
}) => {
  const [suggestions, setSuggestions] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);

  const getSuggesstions = async (query: string) => {
    setLoading(true);
    try {
      const result = await fetchSuggestions(query);
      setSuggestions(result);
    } catch (error) {
      console.log(error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchValue.length > 1) {
      getSuggesstions(searchValue);
    } else {
      setSuggestions([]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    searchToggle && (
      <section
        className={clsx(
          "search-dropdown",
          searchValue.length > 1 &&
            "px-4 py-2 border-2 overflow-x-hidden overflow-y-scroll",
          suggestions.length && "h-64"
        )}
      >
        {loading ? (
          <div className='flex gap-2'>
            <p className='text-sm font-semibold'>Loading</p>
            <div
              className='animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500'
              role='status'
              aria-label='loading'
            ></div>
          </div>
        ) : (
          <section className='flex flex-col gap-2'>
            {suggestions.map((suggestion, index) => (
              <SearchSuggestionItem
                key={index}
                itemId={suggestion.id}
                itemCategory={suggestion.category}
                itemTitle={suggestion.title}
                handleSearchToggle={handleSearchToggle}
                handleSearchInputValue={handleSearchInputValue}
              />
            ))}
          </section>
        )}
      </section>
    )
  );
};
export default SearchSuggestions;
