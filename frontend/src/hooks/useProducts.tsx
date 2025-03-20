import { useEffect, useRef, useState } from 'react';

import { SearchItem, ProductItemDetails, ProductItem } from '@lib/types';
import {
	fetchProductsCategoryList,
	fetchProductSuggestions,
	fetchProductItem,
	fetchProducts,
} from '@api/apiService';

export function useFetchCategoryList() {
	const [categoryList, setCategoryList] = useState<string[]>([]);

	useEffect(() => {
		const controller = new AbortController();

		fetchProductsCategoryList(controller.signal)
			.then(function (data) {
				setCategoryList(['all', ...data]);
			})
			.catch(function (error) {
				console.error(error);
			});

		return () => controller.abort();
	}, []);

	return categoryList;
}

export function useFetchProductSuggestions(query: string) {
	const [suggestions, setSuggestions] = useState<SearchItem[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (query.length > 2) {
			setLoading(true);

			fetchProductSuggestions(query)
				.then(function (data) {
					setSuggestions(data);
				})
				.catch(function (error) {
					console.error(error);
				})
				.finally(function () {
					setLoading(false);
				});
		} else {
			setSuggestions([]);
		}
	}, [query]);

	return { suggestions, loading };
}

export function useFetchProductItem(productId: number | undefined) {
	const [productDetails, setProductDetails] = useState<ProductItemDetails>();

	const [reviews, setReviews] = useState({
		averageReviewsCount: 0,
		totalReviewStars: 5,
	});

	useEffect(() => {
		fetchProductItem(productId)
			.then(function (data) {
				setProductDetails(data);
			})
			.catch(function (error) {
				console.error(error);
			});
	}, [productId]);

	useEffect(() => {
		if (productDetails?.reviews) {
			const totalRatingCount = productDetails.reviews.reduce(
				(prevVal: number, currValue: { rating: number }) =>
					prevVal + currValue.rating,
				0
			);

			const averageReviewsCount = Math.round(
				totalRatingCount / productDetails.reviews.length
			);

			setReviews((prevReviewState) => ({
				...prevReviewState,
				averageReviewsCount,
			}));
		}
	}, [productDetails]);

	return { productDetails, reviews };
}

export function useFetchProducts(currentPath: string) {
	const didFetchRef = useRef(false);
	const [skipCount, setSkipCount] = useState(0);
	const [products, setProducts] = useState<ProductItem[]>([]);
	const [loading, setLoading] = useState({
		pageLoading: false,
		buttonLoading: false,
	});

	useEffect(() => {
		if (!didFetchRef.current) {
			setLoading((prevLoadState) => ({
				...prevLoadState,
				[skipCount === 0 ? 'pageLoading' : 'buttonLoading']: true,
			}));

			fetchProducts(
				'?limit=11&select=title,price,thumbnail,category',
				skipCount
			)
				.then(function (data) {
					setProducts((prevProducts) => [...prevProducts, ...data.products]);
				})
				.finally(function () {
					setLoading({
						pageLoading: false,
						buttonLoading: false,
					});
				});

			return () => {
				didFetchRef.current = true;
			};
		}

		if (didFetchRef.current && skipCount > 0) {
			setLoading((prevLoadState) => ({
				...prevLoadState,
				[skipCount === 0 ? 'pageLoading' : 'buttonLoading']: true,
			}));

			const categorySelection =
				currentPath === 'all'
					? '?limit=11&select=title,price,thumbnail,category'
					: `/category/${currentPath}?limit=11&select=title,price,thumbnail,category`;

			fetchProducts(categorySelection, skipCount)
				.then(function (data) {
					setProducts((prevProducts) => [...prevProducts, ...data.products]);
				})
				.finally(function () {
					setLoading({
						pageLoading: false,
						buttonLoading: false,
					});
				});

			return;
		}

		if (didFetchRef.current && currentPath !== 'all') {
			setSkipCount(0);

			setLoading((prevLoadState) => ({
				...prevLoadState,
				[skipCount === 0 ? 'pageLoading' : 'buttonLoading']: true,
			}));
			fetchProducts(
				`/category/${currentPath}?limit=10&select=title,price,thumbnail,category`,
				skipCount
			)
				.then(function (data) {
					setProducts(data.products);
				})
				.finally(function () {
					setLoading({
						pageLoading: false,
						buttonLoading: false,
					});
				});

			return;
		}

		if (didFetchRef.current && currentPath === 'all') {
			setSkipCount(0);

			setLoading((prevLoadState) => ({
				...prevLoadState,
				[skipCount === 0 ? 'pageLoading' : 'buttonLoading']: true,
			}));

			fetchProducts(
				`?limit=11&select=title,price,thumbnail,category`,
				skipCount
			)
				.then(function (data) {
					setProducts(data.products);
				})
				.finally(function () {
					setLoading({
						pageLoading: false,
						buttonLoading: false,
					});
				});

			return;
		}
	}, [currentPath, skipCount]);

	return { setSkipCount, products, loading };
}
