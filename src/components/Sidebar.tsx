import { FC, useRef, useState } from "react";
import { CareFilterOptions } from "./CareFilterOptions";
import parametersArrow from '../source/icons/arrow.png'
import search from '../source/icons/search.png'
import del from '../source/icons/delete.png'
import { SortSelect } from "./SortSelect";

interface ISidebarProps {
	goods: any[]
	filterHandler: any
	setCurrentPage: (arg: number) => void
	setFilterTags: any
	careFilterHandler: any
	setSortSelect: any
	minPrice: string
	setMinPrice: any
	maxPrice: string
	setMaxPrice: any
	sortArrowActive: boolean
	setSortArrowActive: any
	careOptionsChecked: any
	setCareOptionsChecked: any
};

export const Sidebar: FC<ISidebarProps> = (props) => {

	const manufacturerRef = useRef<any>()

	const [parametersVisible, setParametersVisible] = useState<boolean>(false)

	const [manufacturerSearch, setManufacturerSearch] = useState<any>('')

	const getManufactures = () => {
		let uniqueManufactures = new Set(props.goods.map(i => i.manufacturer))
		return Array.from(uniqueManufactures)
	}

	const onMinPriceChange = (e: React.FormEvent<HTMLInputElement>) => {
		props.setMinPrice(e.currentTarget.value)
	}

	const onMaxPriceChange = (e: React.FormEvent<HTMLInputElement>) => {
		props.setMaxPrice(e.currentTarget.value)
	}

	const onSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
		props.setSortSelect(e.currentTarget.value)
	}

	const clearFilter = (): void => {
		props.setMinPrice('')
		props.setMaxPrice('')
		props.setFilterTags([])
	}

	const onManufacturerSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setManufacturerSearch(manufacturerRef.current.value)
	}

	return (
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
						<input className='catalog__price-input' value={props.minPrice} onChange={onMinPriceChange} type="number" />
						<span>-</span>
						<input className='catalog__price-input' value={props.maxPrice} onChange={onMaxPriceChange} type="number" />
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
									<div onClick={() => props.setCurrentPage(1)} key={item} className='catalog__checkbox'>
										<input data-testid='checkbox' onChange={props.filterHandler} type="checkbox" value={item} />
										<label htmlFor="">{item} </label><span>({props.goods.filter(i => i.manufacturer.includes(item)).length})</span>
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
				<CareFilterOptions
					blockClassName='catalog__sidebar-care-filter'
					itemClassName='catalog__sidebar-care-filter-options'
					careFilterHandler={props.careFilterHandler}
					setCurrentPage={props.setCurrentPage}
					careOptionsChecked={props.careOptionsChecked}
					setCareOptionsChecked={props.setCareOptionsChecked}
				/>
			</div>
			<div className="catalog__mobile-sort">
				<SortSelect
					onSelectChange={onSelectChange}
					setSortArrowActive={props.setSortArrowActive}
					sortArrowActive={props.sortArrowActive}
				/>
			</div>

		</div>
	);
}
