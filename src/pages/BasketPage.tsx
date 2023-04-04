import { FC, useState } from "react";
import { BasketItem } from "../components/BasketItem";
import { useAppDispatch, useAppSelector } from "../hook";
import { Modal } from "../components/Modal";
import { clearBasket } from "../reducers/goodsSlice";

export const BasketPage: FC = (props) => {
	const basketGoods = useAppSelector(state => state.goods.basketList)
	const totalPrice = useAppSelector(state => state.goods.totalPrice)

	const [active, setActive] = useState(false)
	const dispatch = useAppDispatch()

	return (
		<div className="basket">
			<div className="breadcrumb">
				<div className='breadcrumb__item'>Главная</div>
				<div className='vertical-line-sm'></div>
				<div className='breadcrumb__item'>Корзина</div>
			</div>
			<div className="basket__title">
				<h1>КОРЗИНА</h1>
			</div>

			<div className="horizontal-line"></div>
			{
				basketGoods.map(item => {
					return <BasketItem
						key={item.barcode}
						url={item.url}
						title={item.title}
						brand={item.brand}
						type={item.type}
						description={item.description}
						weight={item.weight}
						price={item.price}
						barcode={item.barcode}
						quantity={item.quantity}
					/>
				})
			}
			<div className="basket__order">
				<div onClick={() => { setActive(true); dispatch(clearBasket()) }} className="basket__order-button">
					<button>Оформить заказ</button>
				</div>
				<div className="basket__total-price">
					{totalPrice} ₸
				</div>
			</div>
			<Modal active={active} setActive={setActive} />
		</div>
	);
}
