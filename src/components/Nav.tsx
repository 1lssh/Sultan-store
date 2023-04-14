import { FC } from "react";
interface INavProps { };

export const Nav: FC<INavProps> = (props) => {
	return (
		<>
			<nav>
				<ul className='header__nav-list'>
					<li className='header__nav-item' >О компании</li>
					<li className='header__nav-item' >Доставка и оплата</li>
					<li className='header__nav-item' >Возврат</li>
					<li className='header__nav-item' >Контакты</li>
				</ul>
			</nav>
		</>
	);
}
