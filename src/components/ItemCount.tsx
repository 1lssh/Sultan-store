import { FC } from "react";
import { useAppDispatch } from "../hook";
import { decreaseQuantity, increaseQuantity } from "../reducers/goodsSlice";
interface IItemCounterProps {
	quantity?: number
	barcode?: string
};



export const ItemCounter: FC<IItemCounterProps> = (props) => {
	const dispatch = useAppDispatch()
	return (
		<div className="item-count">
			<button onClick={() => dispatch(decreaseQuantity(props.barcode))}>-</button>
			<span>{props.quantity ? props.quantity : 1}</span>
			<button onClick={() => dispatch(increaseQuantity(props.barcode))}>+</button>
		</div>
	);
}
