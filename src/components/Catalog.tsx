import search from '../source/icons/search.png'

import { GoodsCard } from './GoodsCard'
import del from '../source/icons/delete.png'
import { useMemo, useRef, useState } from 'react'
import arrow from '../source/icons/Polygon 5.png'
import parametersArrow from '../source/icons/arrow.png'
import Pagination from './Pagination'
import { useAppDispatch, useAppSelector } from '../hook'
import { AddCardField } from './AddCardField'
import { setGoods } from '../reducers/goodsSlice'

export const Catalog = () => {

	let getGoods = useAppSelector(state => state.goods.goodsList)

	const dispatch = useAppDispatch()



	const [currentPage, setCurrentPage] = useState<number>(1);

	const manufacturerRef = useRef<any>()

	const [minPrice, setMinPrice] = useState<any>('')
	const [maxPrice, setMaxPrice] = useState<any>('')

	const [manufacturerSearch, setManufacturerSearch] = useState<any>('')

	const [parametersVisible, setParametersVisible] = useState<boolean>(false)

	const [filterTags, setFilterTags] = useState<string[]>([])
	const [careFilterTags, setCareFilterTags] = useState<string[]>([])

	const [sortArrowActive, setSortArrowActive] = useState<boolean>(false)
	const [sortSelect, setSortSelect] = useState<string>('title')

	const [addFieldActive, setAddFieldActive] = useState<boolean>(false)




	const getManufactures = () => {
		let uniqueManufactures = new Set(getGoods.map(i => i.manufacturer))
		return Array.from(uniqueManufactures)
	}

	const test = (arr: any) => {
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
			careFilterTags.includes(test(i.careType))
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

	const onMinPriceChange = (e: React.FormEvent<HTMLInputElement>) => {
		setMinPrice(e.currentTarget.value)
	}
	const onMaxPriceChange = (e: React.FormEvent<HTMLInputElement>) => {
		setMaxPrice(e.currentTarget.value)
	}

	const onManufacturerSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setManufacturerSearch(manufacturerRef.current.value)
	}

	const onSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
		setSortSelect(e.currentTarget.value)
	}

	const clearFilter = (): void => {
		setMinPrice('')
		setMaxPrice('')
		setFilterTags([])
	}


	let PageSize = 15;

	const currentData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return sortHandler(filteredData).slice(firstPageIndex, lastPageIndex);
	}, [currentPage, sortHandler(filteredData)]);


	const [handCareChecked, setHandCareChecked] = useState(false)
	const [bodyCareChecked, setBodyCareChecked] = useState(false)
	const [faceCareChecked, setFaceCareChecked] = useState(false)
	const [footCareChecked, setFootCareChecked] = useState(false)
	const [hairCareChecked, setHairCareChecked] = useState(false)
	return (
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
						<div className="catalog__sort">
							<span className='catalog__sort-title'>Сортировка:</span>
							<select className='catalog__sort-select' onChange={onSelectChange}>
								<option value="title">Название</option>
								<option value="price">Цена</option>
							</select>
							<img
								src={arrow}
								className={`${sortArrowActive ? 'arrow-active' : ''}`}
								onClick={() => setSortArrowActive(prev => !prev)}
								alt=""
							/>
						</div>
					</div>
					<div className="catalog__sort-options">
						<div onClick={() => setCurrentPage(1)} className={handCareChecked ? "catalog__sort-option active" : "catalog__sort-option"} >
							<label >
								Уход за руками
								<input
									checked={handCareChecked}
									onClick={() => setHandCareChecked(prev => !prev)}
									onChange={careFilterHandler}
									type="checkbox"
									value='Уход за руками'
								/>
							</label>
						</div>
						<div onClick={() => setCurrentPage(1)} className={bodyCareChecked ? "catalog__sort-option active" : "catalog__sort-option"}>
							<label >
								Уход за телом
								<input
									checked={bodyCareChecked}
									onClick={() => setBodyCareChecked(prev => !prev)}
									onChange={careFilterHandler}
									type="checkbox"
									value='Уход за телом'
								/>
							</label>
						</div>
						<div onClick={() => setCurrentPage(1)} className={faceCareChecked ? "catalog__sort-option active" : "catalog__sort-option"}>
							<label >
								Уход за лицом
								<input
									checked={faceCareChecked}
									onClick={() => setFaceCareChecked(prev => !prev)}
									onChange={careFilterHandler}
									type="checkbox"
									value='Уход за лицом'
								/>
							</label>
						</div>
						<div onClick={() => setCurrentPage(1)} className={footCareChecked ? "catalog__sort-option active" : "catalog__sort-option"}>
							<label >
								Уход за ногами
								<input
									checked={footCareChecked}
									onClick={() => setFootCareChecked(prev => !prev)}
									onChange={careFilterHandler}
									type="checkbox"
									value='Уход за ногами'
								/>
							</label>
						</div>
						<div onClick={() => setCurrentPage(1)} className={hairCareChecked ? "catalog__sort-option active" : "catalog__sort-option"}>
							<label >
								Уход за волосами
								<input
									checked={hairCareChecked}
									onClick={() => setHairCareChecked(prev => !prev)}
									onChange={careFilterHandler}
									type="checkbox"
									value='Уход за волосами'
								/>
							</label>
						</div>

					</div>
				</div>
				<div className="catalog__main">
					<div className="catalog__sidebar">
						<div className="catalog__parameters">
							<div className="catalog__parameters-title ">
								<div className='catalog__sidebar-title sidebar-title'>
									ПОДБОР ПО ПАРАМЕТРАМ
								</div>
								<div
									onClick={() => setParametersVisible(prev => !prev)}
									className={parametersVisible ? "catalog__show-parameters-btn arrow-active" : "catalog__show-parameters-btn"}
								>
									<img src={parametersArrow} alt="" />
								</div>
							</div>
							<div className={parametersVisible ? 'catalog__parameters-info-visible' : 'catalog__parameters-info'}>
								<div className="catalog__price">
									<div className='catalog__price-title'>Цена ₸</div>
									<input className='catalog__price-input' value={minPrice} onChange={onMinPriceChange} type="number" />
									<span>-</span>
									<input className='catalog__price-input' value={maxPrice} onChange={onMaxPriceChange} type="number" />
								</div>
								<div className="catalog__manufacturer">
									<div className="catalog__manufacturer-title sidebar-title">Производитель</div>
									<div className="catalog__manufacturer-search search-input">
										<form onSubmit={onManufacturerSearchSubmit}>
											<input type="text" ref={manufacturerRef} placeholder='Поиск...' />
											<button type='submit'><img src={search} alt="search" /></button>
										</form>

									</div>
									{
										getManufactures().filter(item => {
											return item.toLowerCase().includes(manufacturerSearch.toLowerCase())
										}).map(item => {
											return (
												<div onClick={() => setCurrentPage(1)} key={item} className='catalog__checkbox'>
													<input onChange={filterHandler} type="checkbox" value={item} />
													<label htmlFor="">{item} </label><span>({getGoods.filter(i => i.manufacturer.includes(item)).length})</span>
												</div>
											)
										})
									}

									<div className="horizontal-line"></div>
								</div>
								<div className="catalog__show">
									<button className="catalog__show-btn">Показать</button>
									<button className="catalog__delete-btn delete-btn" onClick={clearFilter}>
										<img src={del} alt="clear" />
									</button>
								</div>
							</div>
							<div className="catalog__care-filter">
								<div onClick={() => setCurrentPage(1)} className={handCareChecked ? 'catalog__sidebar-care-filter active' : 'catalog__sidebar-care-filter'} >
									<label >
										Уход за руками
										<input
											checked={handCareChecked}
											onClick={() => setHandCareChecked(prev => !prev)}
											onChange={careFilterHandler}
											type="checkbox"
											value='Уход за руками'
										/>
									</label>
								</div>
								<div onClick={() => setCurrentPage(1)} className={bodyCareChecked ? 'catalog__sidebar-care-filter active' : 'catalog__sidebar-care-filter'}>
									<label >
										Уход за телом
										<input
											checked={bodyCareChecked}
											onClick={() => setBodyCareChecked(prev => !prev)}
											onChange={careFilterHandler}
											type="checkbox"
											value='Уход за телом'
										/>
									</label>
								</div>
								<div onClick={() => setCurrentPage(1)} className={faceCareChecked ? 'catalog__sidebar-care-filter active' : 'catalog__sidebar-care-filter'}>
									<label >
										Уход за лицом
										<input
											checked={faceCareChecked}
											onClick={() => setFaceCareChecked(prev => !prev)}
											onChange={careFilterHandler}
											type="checkbox"
											value='Уход за лицом'
										/>
									</label>
								</div>
								<div onClick={() => setCurrentPage(1)} className={footCareChecked ? 'catalog__sidebar-care-filter active' : 'catalog__sidebar-care-filter'}>
									<label >
										Уход за ногами
										<input
											checked={footCareChecked}
											onClick={() => setFootCareChecked(prev => !prev)}
											onChange={careFilterHandler}
											type="checkbox"
											value='Уход за ногами' />
									</label>
								</div>
								<div onClick={() => setCurrentPage(1)} className={hairCareChecked ? 'catalog__sidebar-care-filter active' : 'catalog__sidebar-care-filter'}>
									<label >
										Уход за волосами
										<input checked={hairCareChecked} onClick={() => setHairCareChecked(prev => !prev)} onChange={careFilterHandler} type="checkbox" value='Уход за волосами' />
									</label>
								</div>

							</div>

						</div>
						<div className="catalog__mobile-sort">
							<div className="catalog__sort">
								<span className='catalog__sort-title'>Сортировка:</span>
								<select className='catalog__sort-select' onChange={onSelectChange}>
									<option value="title">Название</option>
									<option value="price">Цена</option>
								</select>
								<img
									src={arrow}
									className={`${sortArrowActive ? 'arrow-active' : ''}`}
									onClick={() => setSortArrowActive(prev => !prev)}
									alt=""
								/>
							</div>
						</div>

					</div>

					<div className="catalog__goods">
						{
							addFieldActive ? <AddCardField setAddFieldActive={setAddFieldActive} />
								:
								<div className='add-btn'>
									<button onClick={() => setAddFieldActive(true)}>+</button>
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
	)
}
