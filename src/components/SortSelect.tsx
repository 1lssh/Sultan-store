import { FC } from "react";
import arrow from '../source/icons/Polygon 5.png'

interface ISortSelectProps {
	sortArrowActive: boolean
	setSortArrowActive: any
	onSelectChange: any
};

export const SortSelect: FC<ISortSelectProps> = (props) => {
	return (
		<>
			<div className="catalog__sort">
				<span className='catalog__sort-title'>Сортировка:</span>
				<select className='catalog__sort-select' onChange={props.onSelectChange}>
					<option value="title">Название</option>
					<option value="price">Цена</option>
				</select>
				<img
					src={arrow}
					className={`${props.sortArrowActive ? 'arrow-active' : ''}`}
					onClick={() => props.setSortArrowActive((prev: any) => !prev)}
					alt=""
				/>
			</div>
		</>

	);
}
