import { FC } from "react";
import logo from '../source/footer-logo.png'
import arrowRight from '../source/icons/arrow-right.png'
import whatsappIcon from '../source/icons/whatsapp.png'
import telegramIcon from '../source/icons/telegram.png'
import visaIcon from '../source/icons/Visa.png'
import mastercardIcon from '../source/icons/mastercard.png'
import { PriceListBtn } from "./PriceListBtn";

export const Footer: FC = () => {
	return (
		<div className="footer">
			<div className="container">
				<div className="footer__wrapper">
					<div className="footer__main">
						<div className="footer__logo">
							<div>
								<img src={logo} alt="" />
							</div>
							<div className="footer__price-list-mobile">
								<PriceListBtn className="price-list-sm" />
							</div>

						</div>
						<div className="footer__description">
							Компания «Султан» — снабжаем розничные магазины товарами
							"под ключ" в Кокчетаве и Акмолинской области
						</div>
						<div className="footer__subscribe">
							<span>Подпишись на скидки и акции</span>
							<div className="footer__input">
								<input placeholder="Введите ваш E-mail" type="text" />
								<button><img src={arrowRight} alt="" /></button>
							</div>
						</div>
					</div>
					<div className="footer__menu">
						<div className="footer__title">
							Меню сайта:
						</div>
						<div className="footer__item">О компании</div>
						<div className="footer__item">Доставка и оплата</div>
						<div className="footer__item">Возврат</div>
						<div className="footer__item">Контакты</div>
					</div>
					<div className="footer__categories">
						<div className="footer__title">
							Категории:
						</div>
						<div className="footer__item">Бытовая химия</div>
						<div className="footer__item">Косметика и гигиена</div>
						<div className="footer__item">Товары для дома</div>
						<div className="footer__item">Товары для детей и мам</div>
						<div className="footer__item">Посуда</div>
					</div>
					<div className="footer__price-list">
						<div className="footer__price-list-title">
							<div className="footer__title">Скачать прайс-лист:</div>
						</div>

						<div className="footer__price-list-btn">
							<PriceListBtn className="price-list" />
						</div>

						<div className="footer__social-media">
							<span>Связь в мессенджерах:</span>
							<div className="footer__social-media-icons">
								<img className="footer__social-media-icon" src={whatsappIcon} alt="" />
								<img className="footer__social-media-icon" src={telegramIcon} alt="" />
							</div>
						</div>
					</div>
					<div className="footer__contacts">
						<div className="footer__title">
							Контакты:
						</div>
						<div className="footer__contact-number">
							+7 (777) 490-00-91
						</div>
						<div className="footer__time">
							время работы: 9:00-20:00
						</div>
						<div className="footer__call">
							Заказать звонок
						</div>
						<div className="footer__mail">
							opt.sultan@mail.ru
							<span>На связи в любое время</span>
							<div className="footer__cards">
								<img src={visaIcon} alt="" />
								<img src={mastercardIcon} alt="" />
							</div>
						</div>
					</div>
				</div>

			</div>

		</div>
	);
}
