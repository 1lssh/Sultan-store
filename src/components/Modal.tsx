import closeIcon from '../source/icons/close.png'
import completedIcon from '../source/icons/completed.png'

import { FC } from "react";
interface IModalProps {
	active: boolean,
	setActive: any
};

export const Modal: FC<IModalProps> = (props) => {

	return (
		<div className={props.active ? "modal active" : "modal"} onClick={() => props.setActive(false)}>
			<div className="modal__content" onClick={e => e.stopPropagation()}>
				<div onClick={() => props.setActive(false)} className="modal__close">
					<img src={closeIcon} alt="" />
				</div>
				<div className="modal__img">
					<img src={completedIcon} alt="" />
				</div>
				<div className="modal__title">
					Спасибо за заказ
				</div>
				<div className="modal__text">
					Наш менеджер свяжется с вами в ближайшее время
				</div>
			</div>
		</div>
	);
}
