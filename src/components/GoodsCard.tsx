import bottle from '../source/icons/bottle.png'
import pack from '../source/icons/type.png'

import { Link } from "react-router-dom";

import { FC, useState } from "react";
import { ToBasketBtn } from './ToBasketBtn';
import { useAppDispatch } from '../hook';
import { addToBasket, deleteProduct, editCard } from '../reducers/goodsSlice';
import del from '../source/icons/close.png'
import { MultiSelectDropdown } from './MultiSelectdropdown';
import complete from '../source/icons/completed.png'
import editIcon from '../source/icons/pencil.png'


interface IGoodsCardProps {
	url: string
	title: string,
	weight: string,
	manufacturer: string,
	brand: string,
	type: string,
	barcode: string,
	price: number,
	careType: string[]
	description: string
};

export const GoodsCard: FC<IGoodsCardProps> = (props) => {
	const product = {
		url: props.url,
		title: props.title,
		weight: props.weight,
		manufacturer: props.manufacturer,
		brand: props.brand,
		type: props.type,
		barcode: props.barcode,
		price: props.price,
		description: props.description,
		careType: props.careType,
		quantity: 1
	}
	const [edit, setEdit] = useState(false)

	const [title, setTitle] = useState(props.title)
	const [newBarcode, setNewBarcode] = useState(props.barcode)
	const [brand, setBrand] = useState(props.brand)
	const [price, setPrice] = useState(props.price)
	const [manufacturer, setManufacturer] = useState(props.manufacturer)
	const dispatch = useAppDispatch()
	let id = props.barcode
	const [selected, setSelected] = useState<string[]>([])



	const toggleOption = (option: string) => {
		setSelected(prevSelected => {
			const newArray = [...prevSelected]
			if (newArray.includes(option)) {
				return newArray.filter(item => item !== option)
			} else {
				newArray.push(option)
				return newArray;
			}
		})
	}

	const confirmEdit = () => {
		dispatch(editCard({ title, newBarcode, brand, price, manufacturer, id, selected }))
		setEdit(false)
	}

	return (
		<div className='good-card'>

			{
				edit ? <img className='edit-confirm' onClick={confirmEdit} src={complete} alt="" /> :
					<img
						className='edit-icon'
						onClick={() => setEdit(true)}
						src={editIcon}
						alt="edit"
					/>
			}
			<img onClick={() => dispatch(deleteProduct(props.barcode))} src={del} alt="" className="good-card__del" />
			<div className="good-card__main">

				<div className='good-card__img'>
					<Link to={`/${props.barcode}`}>
						<img src={props.url} alt="" />
					</Link>

				</div>
				<div className='good-card__weight'>
					<img
						src={props.type === 'мл' ? bottle : pack}
						className='good-card__weight-img'
						alt=""
					/>
					{props.weight}
				</div>

				<div className='good-card__title'>
					{
						!edit ?
							<Link className='link' to={`/${props.barcode}`}>
								<b>{props.brand} </b>
								{props.title}
							</Link>
							:
							<input value={title} onChange={(e) => setTitle(e.currentTarget.value)} type='text' />
					}

				</div>

			</div>
			<div className="good-card__description">
				<div className='good-card__barcode card-description'>
					<span>Штрихкод:</span>
					{
						!edit ? props.barcode
							: <input value={newBarcode} onChange={(e) => setNewBarcode(e.currentTarget.value)} type='text' />
					}
				</div>
				<div className='good-card__manufacturer card-description'>
					<span>Производитель:</span>
					{
						!edit ? props.manufacturer
							: <input value={manufacturer} onChange={(e) => setManufacturer(e.currentTarget.value)} type='text' />
					}
				</div>
				<div className='good-card__brand card-description'>
					<span>Бренд:</span>
					{
						!edit ? props.brand
							: <input value={brand} onChange={(e) => setBrand(e.currentTarget.value)} type='text' />
					}
				</div>
				<div className='good-card__brand card-description'>
					<span>Тип ухода:</span>
					{
						!edit ? props.careType.map(i => <span key={i}>{i}; </span>)
							: <MultiSelectDropdown selected={selected} toggleOption={toggleOption} />
					}
				</div>
			</div>
			<div className="good-card__to-basket">
				<div className='good-card__price'>
					{
						!edit ? props.price
							: <input value={price} onChange={(e) => setPrice(+e.currentTarget.value)} type='number' />
					}
					₸
				</div>
				<div onClick={() => dispatch(addToBasket(product))}>
					<ToBasketBtn />
				</div>

			</div>

		</div >
	);
}
