import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { ToBasketBtn } from "../components/ToBasketBtn";
import share from '../source/icons/share.png'
import priceList from '../source/icons/priceList.png'
import arrow from '../source/icons/Polygon 5.png'
import bottle from '../source/icons/bottle.png'
import pack from '../source/icons/type.png'
import { useAppDispatch, useAppSelector } from "../hook";
import { addToBasket } from "../reducers/goodsSlice";



export const ProductCardPage: FC = () => {
	let goods = useAppSelector(state => state.goods.goodsList)
	let { id } = useParams()
	let currentProduct = goods.filter(item => item.barcode === id)

	const [isCharacteristicsVisible, setIsCharacteristicsVisible] = useState<boolean>(false)
	const [isDescriptionVisible, setIsDescriptionVisible] = useState<boolean>(false)

	const [counter, setCounter] = useState(1)

	const increaseCounter = () => {
		setCounter(counter + 1)
	}
	const decreaseCounter = () => {
		if (counter !== 1) {
			setCounter(counter - 1)
		}
	}

	const dispatch = useAppDispatch()
	return (
		<div>
			{
				currentProduct.map(item => {
					return (
						<div key={item.barcode} className="breadcrumb">
							<div className='breadcrumb__item'>Главная</div>
							<div className='vertical-line-sm'></div>
							<div className='breadcrumb__item'>Косметика и гигиена</div>
							<div className='vertical-line-sm'>{item.brand}</div>
							<div className='breadcrumb__item'>{item.title} </div>
						</div>
					)
				})
			}
			{currentProduct.map((item: any) => {
				return (

					<div className='product' key={item.barcode}>
						<div className="product__img">
							<img src={item.url} alt="" />
						</div>
						<div className="product__desc">
							<div className="product__in-stock">
								В наличии
							</div>
							<div className="product__title">
								<b>{item.brand}</b> {item.title}
							</div>
							<div className="product__weight">
								<img
									src={item.type === 'мл' ? bottle : pack}
									alt=""
								/>
								{item.weight}
							</div>
							<div className="product__basket">
								<div className="product__price">
									{item.price * counter}₸
								</div>
								<div className="product__count">
									<div className="item-count">
										<button onClick={decreaseCounter}>-</button>
										<span>{counter} </span>
										<button onClick={increaseCounter}>+</button>
									</div>
								</div>
								<div
									onClick={() => {
										dispatch(addToBasket({
											url: item.url,
											title: item.title,
											weight: item.weight,
											manufacturer: item.manufacturer,
											brand: item.brand,
											type: item.type,
											barcode: item.barcode,
											price: item.price,
											description: item.description,
											quantity: counter
										})); setCounter(1)
									}}

									className="product__btn"
								>
									<ToBasketBtn />
								</div>
								<div className="product__share-btn">
									<img src={share} alt="share" />
								</div>
								<div className="product__promotion">
									При покупке от <b>10 000 ₸</b> бесплатная доставка по Кокчетаву и области
								</div>
								<div className="product__price-list">
									Прайс-лист <img src={priceList} alt="" />
								</div>
							</div>

							<div className="product__info">
								<div className="product__info-item">
									<span>Производитель:</span> {item.manufacturer}
								</div>
								<div className="product__info-item">
									<span>Бренд:</span> {item.brand}
								</div>
								<div className="product__info-item">
									<span>Артикул:</span> 460404
								</div>
								<div className="product__info-item">
									<span>Штрихкод:</span> {item.barcode}
								</div>
							</div>
							<div className="product__description">
								<div
									className="product__description-title"
									onClick={() => setIsDescriptionVisible(prev => !prev)}
								>
									Описание
									<img
										src={arrow}
										className={!isDescriptionVisible ? '' : 'arrow-active'}
										alt=""
									/>
								</div>
								<div className={!isDescriptionVisible ? 'is-visible' : 'product__description-info'}>
									{item.description}
								</div>
							</div>
							<div className="horizontal-line"></div>
							<div className="product__characteristics">
								<div
									className="product__characteristics-title"
									onClick={() => setIsCharacteristicsVisible(prev => !prev)}
								>
									Характеристики
									<img
										src={arrow}
										className={!isCharacteristicsVisible ? '' : 'arrow-active'}
										alt=""
									/>
								</div>
								<div className={!isCharacteristicsVisible ? 'is-visible' : 'product__characteristics-items'}>
									<div className="product__characteristics-item">
										<span>Назначение:</span> {item.brand}
									</div>
									<div className="product__characteristics-item">
										<span>Тип:</span> {item.brand}
									</div>
									<div className="product__characteristics-item">
										<span>Производитель:</span> {item.manufacturer}
									</div>
									<div className="product__characteristics-item">
										<span>Бренд:</span> {item.brand}
									</div>
									<div className="product__characteristics-item">
										<span>Артикул:</span> {item.barcode}
									</div>
									<div className="product__characteristics-item">
										<span>Штрихкод:</span> {item.barcode}
									</div>
									<div className="product__characteristics-item">
										<span>Вес:</span> {item.weight}
									</div>
									<div className="product__characteristics-item">
										<span>Объем:</span> {item.weight}
									</div>
									<div className="product__characteristics-item">
										<span>Кол-во в коробке:</span> {item.weight}
									</div>
								</div>

							</div>
						</div>

					</div>
				)
			})}
		</div>
	);
}
