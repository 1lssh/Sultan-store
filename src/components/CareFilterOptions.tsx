import { FC } from "react";
interface ICareFilterOptionsProps {
	blockClassName: string
	itemClassName: string
	setCurrentPage: (arg: number) => void
	careOptionsChecked: any
	setCareOptionsChecked: any
	careFilterHandler: any

};

export const CareFilterOptions: FC<ICareFilterOptionsProps> = ({
	blockClassName,
	itemClassName,
	setCurrentPage,
	careFilterHandler,
	careOptionsChecked,
	setCareOptionsChecked }) => {

	return (
		<div className={blockClassName}>
			<div data-testid='filter-option' onClick={() => setCurrentPage(1)} className={careOptionsChecked.handCare ? `${itemClassName} active` : itemClassName} >
				<label >
					Уход за руками
					<input
						checked={careOptionsChecked.handCare}
						onClick={() => setCareOptionsChecked({ ...careOptionsChecked, handCare: !careOptionsChecked.handCare })}
						onChange={careFilterHandler}
						type="checkbox"
						value='Уход за руками'
					/>
				</label>
			</div>
			<div onClick={() => setCurrentPage(1)} className={careOptionsChecked.bodyCare ? `${itemClassName} active` : itemClassName}>
				<label >
					Уход за телом
					<input
						checked={careOptionsChecked.bodyCare}
						onClick={() => setCareOptionsChecked({ ...careOptionsChecked, bodyCare: !careOptionsChecked.bodyCare })}
						onChange={careFilterHandler}
						type="checkbox"
						value='Уход за телом'
					/>
				</label>
			</div>
			<div onClick={() => setCurrentPage(1)} className={careOptionsChecked.faceCare ? `${itemClassName} active` : itemClassName}>
				<label >
					Уход за лицом
					<input
						checked={careOptionsChecked.faceCare}
						onClick={() => setCareOptionsChecked({ ...careOptionsChecked, faceCare: !careOptionsChecked.faceCare })}
						onChange={careFilterHandler}
						type="checkbox"
						value='Уход за лицом'
					/>
				</label>
			</div>
			<div onClick={() => setCurrentPage(1)} className={careOptionsChecked.footCare ? `${itemClassName} active` : itemClassName}>
				<label >
					Уход за ногами
					<input
						checked={careOptionsChecked.footCare}
						onClick={() => setCareOptionsChecked({ ...careOptionsChecked, footCare: !careOptionsChecked.footCare })}
						onChange={careFilterHandler}
						type="checkbox"
						value='Уход за ногами'
					/>
				</label>
			</div>
			<div onClick={() => setCurrentPage(1)} className={careOptionsChecked.hairCare ? `${itemClassName} active` : itemClassName}>
				<label >
					Уход за волосами
					<input
						checked={careOptionsChecked.hairCare}
						onClick={() => setCareOptionsChecked({ ...careOptionsChecked, hairCare: !careOptionsChecked.hairCare })}
						onChange={careFilterHandler}
						type="checkbox"
						value='Уход за волосами'
					/>
				</label>
			</div>
		</div>
	);
}
