import { FC, useMemo, useState } from "react";
import { useAppSelector } from '../hook';
import { CareFilterOptions } from '../components/CareFilterOptions';
import { Sidebar } from '../components/Sidebar';
import { AddCardField } from '../components/AddCardField';
import { GoodsCard } from '../components/GoodsCard';
import Pagination from '../components/Pagination';
import { SortSelect } from '../components/SortSelect';


export const CatalogPage: FC = (props) => {
	let getGoods = useAppSelector(state => state.goods.goodsList)

	const [currentPage, setCurrentPage] = useState<number>(1);


	const [minPrice, setMinPrice] = useState<any>('')
	const [maxPrice, setMaxPrice] = useState<any>('')


	const [filterTags, setFilterTags] = useState<string[]>([])
	const [careFilterTags, setCareFilterTags] = useState<string[]>([])

	const [sortArrowActive, setSortArrowActive] = useState<boolean>(false)
	const [sortSelect, setSortSelect] = useState<string>('title')

	const [addFieldActive, setAddFieldActive] = useState<boolean>(false)


	const [careOptionsChecked, setCareOptionsChecked] = useState({
		handCare: false,
		bodyCare: false,
		faceCare: false,
		footCare: false,
		hairCare: false
	})


	const getCareFilterItem = (arr: any) => {
		let currentItem
		for (let i = 0; i < arr.length; i++) {
			if (careFilterTags.includes(arr[i])) {
				currentItem = arr[i]
				break;
			}
		}
		return currentItem
	}

	const filteredData = getGoods.filter((i) =>
		filterTags.length > 0
			? filterTags.includes(i.manufacturer)
			: getGoods
	).filter((i) =>
		careFilterTags.length > 0
			?
			careFilterTags.includes(getCareFilterItem(i.careType))
			: getGoods

	).filter(i => {
		if (maxPrice === '') return i.price >= minPrice
		if (minPrice === '') return i.price <= maxPrice
		return +i.price >= +minPrice && +i.price <= +maxPrice
	})


	const filterHandler = (e: React.FormEvent<HTMLInputElement>) => {
		if (e.currentTarget.checked) {
			setFilterTags([...filterTags, e.currentTarget.value])
		} else {
			setFilterTags(
				filterTags.filter((filterTag) => filterTag !== e.currentTarget.value)
			)
		}
	}

	const careFilterHandler = (e: React.FormEvent<HTMLInputElement>) => {
		if (e.currentTarget.checked) {
			setCareFilterTags([...careFilterTags, e.currentTarget.value])
		} else {
			setCareFilterTags(
				careFilterTags.filter((filterTag) => filterTag !== e.currentTarget.value)
			)
		}
		console.log(careFilterTags)
	}

	const sortHandler = (arr: any) => {
		if (sortSelect === 'title' && !sortArrowActive) {
			return arr.sort((x: any, y: any) => x.title.localeCompare(y.title))
		}
		if (sortSelect === 'title' && sortArrowActive) {
			return arr.sort((x: any, y: any) => x.title.localeCompare(y.title)).reverse()
		}
		if (sortSelect === 'price' && !sortArrowActive) {
			return arr.sort((x: any, y: any) => x.price - y.price)
		}
		if (sortSelect === 'price' && sortArrowActive) {
			return arr.sort((x: any, y: any) => y.price - x.price)
		}
		return arr
	}

	const onSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
		setSortSelect(e.currentTarget.value)
	}


	let PageSize = 15;

	const currentData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return sortHandler(filteredData).slice(firstPageIndex, lastPageIndex);
	}, [currentPage, sortHandler(filteredData)]);

	return (
		<div data-testid='catalog-page'>
			<div>
				<div className="breadcrumb">
					<div className='breadcrumb__item'>Главная</div>
					<div className='vertical-line-sm'></div>
					<div className='breadcrumb__item'>Косметика и гигиена</div>
				</div>
				<div className="catalog">
					<div className="catalog__head">
						<div className="catalog__title">
							<h1>Косметика и гигиена</h1>
						</div>
						<div className="catalog__desktop-sort">
							<SortSelect
								onSelectChange={onSelectChange}
								setSortArrowActive={setSortArrowActive}
								sortArrowActive={sortArrowActive}
							/>
						</div>
						<CareFilterOptions
							blockClassName='catalog__sort-options'
							itemClassName='catalog__sort-option'
							careFilterHandler={careFilterHandler}
							setCurrentPage={setCurrentPage}
							careOptionsChecked={careOptionsChecked}
							setCareOptionsChecked={setCareOptionsChecked}
						/>

					</div>
					<div className="catalog__main">
						<Sidebar
							goods={getGoods}
							filterHandler={filterHandler}
							careFilterHandler={careFilterHandler}
							setFilterTags={setFilterTags}
							minPrice={minPrice}
							setMinPrice={setMinPrice}
							maxPrice={maxPrice}
							setMaxPrice={setMaxPrice}
							setCurrentPage={setCurrentPage}
							setSortSelect={setSortSelect}
							sortArrowActive={sortArrowActive}
							setSortArrowActive={setSortArrowActive}
							careOptionsChecked={careOptionsChecked}
							setCareOptionsChecked={setCareOptionsChecked}
						/>

						<div className="catalog__goods">
							{
								addFieldActive ? <AddCardField setAddFieldActive={setAddFieldActive} />
									:
									<div className='add-btn'>
										<button data-testid='show-add-field-btn' onClick={() => setAddFieldActive(true)}>+</button>
									</div>
							}

							<div className="catalog__goods-grid">
								{
									currentData.map((item: any) => {
										return (
											<GoodsCard
												key={item.barcode}
												description={item.description}
												url={item.url}
												title={item.title}
												barcode={item.barcode}
												brand={item.brand}
												careType={item.careType}
												type={item.type}
												price={item.price}
												weight={item.weight}
												manufacturer={item.manufacturer} />
										)
									})
								}
							</div>

							<div className='catalog__pagination'>
								<Pagination
									className="pagination-bar"
									currentPage={currentPage}
									totalCount={sortHandler(filteredData).length}
									pageSize={PageSize}
									onPageChange={(page: any) => setCurrentPage(page)}
								/>
							</div>
							<div className="catalog__text">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ut justo, vestibulum sagittis iaculis iaculis. Quis mattis vulputate feugiat massa vestibulum duis. Faucibus consectetur aliquet sed pellentesque consequat consectetur congue mauris venenatis. Nunc elit, dignissim sed nulla ullamcorper enim, malesuada.
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
