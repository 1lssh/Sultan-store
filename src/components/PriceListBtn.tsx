import { FC } from "react";
import priceListIcon from '../source/icons/Vector.png'
interface IPriceListBtnProps {
	className: string
};

export const PriceListBtn: FC<IPriceListBtnProps> = (props) => {
	return (
		<div className={props.className}>
			<button>Прайс-лист <img src={priceListIcon} alt="" /></button>
		</div>
	);
}
