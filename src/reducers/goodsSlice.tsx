import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type product = {
	url: string
	title: string
	description: string
	barcode: string
	price: number
	manufacturer: string
	brand: string
	careType: string[]
	type: string
	weight: string
	quantity: number
}

type goodsState = {
	goodsList: product[]
	basketList: product[]
	totalPrice: number
	totalQuantity: number
}

const initialState: goodsState = {
	goodsList: [],
	basketList: [],
	totalPrice: 0,
	totalQuantity: 0
}

const goodsSlice = createSlice({
	name: 'goods',
	initialState,
	reducers: {
		setGoods(state, action: PayloadAction<any>) {
			state.goodsList.push(action.payload)
		},
		addProduct(state, action: PayloadAction<any>) {
			state.goodsList.unshift(action.payload)
		},
		deleteProduct(state, action: PayloadAction<any>) {
			state.goodsList = state.goodsList.filter(item => item.barcode !== action.payload)
		},
		addToBasket(state, action: PayloadAction<any>) {
			let currentProduct = state.basketList.find(i => i.barcode === action.payload.barcode)
			if (currentProduct) {
				currentProduct.quantity += action.payload.quantity
			} else {
				state.basketList.push(action.payload)
			}
			state.totalPrice += action.payload.price * action.payload.quantity
			state.totalQuantity += action.payload.quantity
		},
		removeProduct(state, action: PayloadAction<any>) {
			state.basketList = state.basketList.filter(item => item.barcode !== action.payload.barcode)
			state.totalPrice -= action.payload.price * action.payload.quantity
			state.totalQuantity -= action.payload.quantity
		},
		increaseQuantity(state, action: PayloadAction<any>) {
			let currentProduct = state.basketList.find(i => i.barcode === action.payload)
			if (currentProduct) {
				currentProduct.quantity += 1
				state.totalPrice += currentProduct.price
				state.totalQuantity++
			}

		},
		decreaseQuantity(state, action: PayloadAction<any>) {
			let currentProduct = state.basketList.find(i => i.barcode === action.payload)
			if (currentProduct) {
				currentProduct.quantity -= 1
				state.totalQuantity--
				state.totalPrice -= currentProduct.price
				if (currentProduct.quantity === 0) {
					state.basketList = state.basketList.filter(item => item.barcode !== action.payload)
				}
			}
		},
		editCard(state, action) {
			let currentProduct = state.goodsList.find(i => i.barcode === action.payload.id)
			if (currentProduct) {
				currentProduct.barcode = action.payload.newBarcode
				currentProduct.brand = action.payload.brand
				currentProduct.title = action.payload.title
				currentProduct.price = action.payload.price
				currentProduct.manufacturer = action.payload.manufacturer
				currentProduct.careType = action.payload.selected
			}

		},
		clearBasket(state) {
			state.basketList = initialState.basketList
			state.totalPrice = initialState.totalPrice
			state.totalQuantity = initialState.totalQuantity
		}
	}

})

export const { setGoods, addProduct, deleteProduct, addToBasket, removeProduct, increaseQuantity, decreaseQuantity, clearBasket, editCard } = goodsSlice.actions

export default goodsSlice.reducer;