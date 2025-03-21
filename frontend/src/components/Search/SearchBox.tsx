import React from 'react';
import clsx from 'clsx';

import { Input } from '@components/ui/input';

import { X } from 'lucide-react';

type Props = {
	searchToggle: boolean;
	searchValue: string;
	handleSearchToggle: React.Dispatch<React.SetStateAction<boolean>>;
	handleSearchInputValue: React.Dispatch<React.SetStateAction<string>>;
};

function SearchBox({
	searchToggle,
	searchValue,
	handleSearchToggle,
	handleSearchInputValue,
}: Props) {
	return (
		<section
			className={clsx(
				'absolute top-0 left-0 flex justify-center items-center px-10 gap-4 bg-white w-full h-full transition-all duration-200 border-b border-black',
				!searchToggle ? 'opacity-0 z-1' : 'z-30 opacity-100'
			)}
		>
			<Input
				className='py-5'
				type='search'
				placeholder='Search...'
				value={searchValue}
				onChange={(e) => handleSearchInputValue(e.target.value.toLowerCase())}
				autoComplete='off'
			/>
			<X
				size={35}
				className='p-[2px] border-2 rounded-md hover:bg-gray-50 hover:cursor-pointer active:bg-gray-100'
				onClick={() => handleSearchToggle(false)}
			/>
		</section>
	);
}
export default SearchBox;
