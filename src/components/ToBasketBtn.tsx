import { FC } from "react";
import cardBasket from '../source/icons/card-basket.png'

export const ToBasketBtn: FC = () => {
	return (
		<div className='good-card__button'>
			<button>В корзину <img src={cardBasket} alt="basket" /></button>
		</div>
	);
}
