import del from '../source/icons/delete.png'
import bottle from '../source/icons/bottle.png'
import pack from '../source/icons/type.png'

import { FC } from "react";
import { ItemCounter } from './ItemCount';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../hook';
import { removeProduct } from '../reducers/goodsSlice';

interface IBasketItemProps {
	url: string
	title: string
	brand: string
	type: string
	description: string
	weight: string
	price: number
	barcode: string
	quantity: number
};

export const BasketItem: FC<IBasketItemProps> = (props) => {
	const dispatch = useAppDispatch()

	return (
		<>
			<div className="basket__item">
				<div className="basket__item-main">
					<div className="basket__item-img">
						<Link to={`/${props.barcode}`}>
							<img src={props.url} alt="" />
						</Link>
					</div>
					<div className="basket__item-info">
						<div className="basket__item-weight">
							<img
								src={props.type === 'мл' ? bottle : pack}
								alt=""
							/>
							{props.weight}
						</div>
						<div className="basket__item-title">
							<Link className='link' to={`/${props.barcode}`}>
								{props.brand} {props.title}
							</Link>
						</div>
						<div className="basket__item-description">
							{props.description}
						</div>
					</div>
				</div>
				<div className="basket__item-control">
					<div className="basket__vertical-line vertical-line"></div>
					<div className="basket__item-counter">
						<ItemCounter quantity={props.quantity} barcode={props.barcode} />
					</div>

					<div className="basket__vertical-line vertical-line"></div>
					<div className="basket__item-price">
						{props.price * props.quantity} ₸
					</div>
					<div className="basket__vertical-line vertical-line"></div>
					<div className="basket__item-delete">
						<button onClick={() => dispatch(removeProduct(props))} className="delete-btn">
							<img src={del} alt="clear" />
						</button>
					</div>
				</div>
			</div>
			<div className="horizontal-line"></div>
		</>
	);
}
