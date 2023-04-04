import locationIcon from '../source/icons/Group.png'
import mailIcon from '../source/icons/mail.png'
import logo from '../source/logo.png'
import catalog from '../source/icons/catalog.png'
import catalogMobile from '../source/icons/catalog-mobile.png'
import search from '../source/icons/search.png'
import searchMobile from '../source/icons/search-mobile.png'
import burger from '../source/icons/burger.png'
import operator from '../source/operator.png'
import basket from '../source/icons/basket.png'
import { Link } from 'react-router-dom'
import { PriceListBtn } from './PriceListBtn'
import { useAppSelector } from '../hook'


function Header() {
	const totalPrice = useAppSelector(state => state.goods.totalPrice)
	const totalQuantity = useAppSelector(state => state.goods.totalQuantity)


	return (
		<div className="header">
			<div className='header__menu'>
				<div className="header__info">
					<div className="header__location">
						<div className='header__icon'>
							<img src={locationIcon} alt="location icon" />
						</div>
						<div>
							<div>
								<b>г. Кокчетав, ул. Ж. Ташенова 129Б</b>
							</div>
							<div>
								(Рынок Восточный)
							</div>
						</div>
					</div>
					<div className="header__mail">
						<div className='header__icon'>
							<img src={mailIcon} alt="mail icon" />
						</div>
						<div>
							<div>
								<b>opt.sultan@mail.ru</b>
							</div>
							<div>
								На связи в любое время
							</div>
						</div>
					</div>
				</div>
				<div className="header__nav">
					<nav>
						<ul className='header__nav-list'>
							<li className='header__nav-item' >О компании</li>
							<li className='header__nav-item' >Доставка и оплата</li>
							<li className='header__nav-item' >Возврат</li>
							<li className='header__nav-item' >Контакты</li>
						</ul>
					</nav>
				</div>
			</div>
			<div className="row-full"></div>
			<div className="header__main">
				<div className="header__burger">
					<button>
						<img src={burger} alt="" />
					</button>

				</div>
				<div className="header__logo">
					<Link to={'/'} ><img src={logo} alt="logo" /></Link>
				</div>
				<div className="header__catalog">
					<button>
						<img
							className='header__catalog-img-mobile'
							src={catalogMobile}
							alt=""
						/>
						Каталог
						<img
							className='header__catalog-img'
							src={catalog}
							alt="catalog"
						/>
					</button>
				</div>
				<div className="vertical-line-sm"></div>
				<div className="header__search">
					<input type="text" placeholder='Поиск...' /><button><img src={search} alt="search" /></button>
					<div className="header__search-btn"><img src={searchMobile} alt="" /> Поиск</div>
				</div>
				<div className="header__contact">
					<div className='header__contact-info'>
						<div className='header__contact-number'>+7 (777) 490-00-91</div>
						<div className='header__contact-time'>время работы: 9:00-20:00</div>
						<div className='header__contact-call'>Заказать звонок</div>
					</div>
					<div className='header__image'>
						<img src={operator} alt="operator" />
					</div>
				</div>
				<div className="vertical-line"></div>
				<div className="header__price-list">
					<PriceListBtn className={'price-list'} />
				</div>

				<div className="vertical-line"></div>

				<div className="header__basket">

					<div className='header__basket-icon'>
						<Link to={'/basket'} className='link'>
							<img src={basket} alt="" />
							<span>{totalQuantity}</span>
						</Link>
					</div>
					<div className='header__basket-info' >
						<div className='header__basket-title'>Корзина</div>
						<div className='header__basket-price'>{totalPrice} ₸</div>
					</div>

				</div>
				<div className="header__mobile-row">
					<div className="row-full"></div>
				</div>

			</div>
			<div className="row-full"></div>
		</div>
	)
}

export default Header