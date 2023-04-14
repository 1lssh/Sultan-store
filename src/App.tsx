import { useEffect } from 'react'
import './css/App.css';
import { Route, Routes } from 'react-router-dom';
import { ProductCardPage } from './pages/ProductCardPage';
import Layout from './components/Layout';
import { CatalogPage } from './pages/CatalogPage';
import { BasketPage } from './pages/BasketPage';
import { useAppDispatch, useAppSelector } from './hook';
import { setGoods } from './reducers/goodsSlice';
import goods from './goods.json'


function App() {
	let getGoods = useAppSelector(state => state.goods.goodsList)
	const dispatch = useAppDispatch()
	useEffect(() => {
		if (getGoods.length === 0) goods.forEach(i => dispatch(setGoods(i)))
	}, [getGoods])

	return (
		<>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route path=':id' element={<ProductCardPage />} />
					<Route index element={<CatalogPage />} />
					<Route path='/basket' element={<BasketPage />} />
				</Route>
			</Routes>
		</>

	);
}

export default App;
