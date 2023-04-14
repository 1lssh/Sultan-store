import { FC, useState } from "react";
import { useAppDispatch } from "../hook";
import { addProduct } from "../reducers/goodsSlice";
import { MultiSelectDropdown } from "./MultiSelectdropdown";
interface IaddCardFieldProps {
	setAddFieldActive: any
};

export const AddCardField: FC<IaddCardFieldProps> = (props) => {
	const [url, setUrl] = useState('')
	const [title, setTitle] = useState('')
	const [type, setType] = useState('')
	const [weight, setWeight] = useState('')
	const [barcode, setBarcode] = useState('')
	const [manufacturer, setManufacturer] = useState('')
	const [brand, setBrand] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState(0)

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

	const titleChange = (e: React.FormEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}
	const urlChange = (e: React.FormEvent<HTMLInputElement>) => {
		setUrl(e.currentTarget.value)
	}
	const typeChange = (e: React.FormEvent<HTMLInputElement>) => {
		setType(e.currentTarget.value)
	}
	const weightChange = (e: React.FormEvent<HTMLInputElement>) => {
		setWeight(e.currentTarget.value)
	}
	const brandChange = (e: React.FormEvent<HTMLInputElement>) => {
		setBrand(e.currentTarget.value)
	}
	const barcodeChange = (e: React.FormEvent<HTMLInputElement>) => {
		setBarcode(e.currentTarget.value)
	}
	const descriptionChange = (e: React.FormEvent<HTMLInputElement>) => {
		setDescription(e.currentTarget.value)
	}
	const manufacturerChange = (e: React.FormEvent<HTMLInputElement>) => {
		setManufacturer(e.currentTarget.value)
	}
	const priceChange = (e: React.FormEvent<HTMLInputElement>) => {
		setPrice(+e.currentTarget.value)
	}

	const product = {
		url: url,
		title: title,
		barcode: barcode,
		price: price,
		manufacturer: manufacturer,
		careType: selected,
		quantity: 1
	}


	const dispatch = useAppDispatch()


	return (
		<div >
			<div data-testid='add-field-elem' className="add-field">
				<div >
					<div className='add-field__title' >Изображение</div>
					<input value={url} onChange={urlChange} type="text" />
				</div>
				<div>
					<div className='add-field__title' >Название</div>
					<input value={title} onChange={titleChange} type="text" />
				</div>
				<div>
					<div className='add-field__title' >Тип ухода</div><MultiSelectDropdown selected={selected} toggleOption={toggleOption} />
				</div>
				<div>
					<div className='add-field__title' >Тип</div>
					<input value={type} onChange={typeChange} type="text" />
				</div>
				<div>
					<div className='add-field__title' >Вес</div>
					<input value={weight} onChange={weightChange} type="text" />
				</div>
				<div>
					<div className='add-field__title' >Штрихкод</div>
					<input value={barcode} onChange={barcodeChange} type="text" />
				</div>

				<div>
					<div className='add-field__title' >Производитель</div>
					<input value={manufacturer} onChange={manufacturerChange} type="text" />
				</div>
				<div>
					<div className='add-field__title' >Бренд</div>
					<input value={brand} onChange={brandChange} type="text" />
				</div>

				<div>
				</div>
				<div>
					<div className='add-field__title' >Описание</div>
					<input value={description} onChange={descriptionChange} type="text" />
				</div>
				<div>
					<div className='add-field__title' >Цена</div>
					<input value={price} onChange={priceChange} type="number" />
				</div>
				<button onClick={() => dispatch(addProduct(product))}>Добавить</button>
				<button onClick={() => props.setAddFieldActive(false)}>Отмена</button>
			</div>

		</div>
	);


}