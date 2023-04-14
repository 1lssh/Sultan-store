import goodsSlice, { editCard, removeProduct } from "../goodsSlice"

describe('goods slice', () => {
	test('should remove item by barcode with "removeProduct" action', () => {
		const action = {
			type: removeProduct.type, payload: {
				barcode: "4604049097548",
				quantity: 1,
				price: 48.5
			}
		}
		const result = goodsSlice({
			goodsList: [],
			basketList: [{
				url: "https://sun9-58.userapi.com/impg/5ODiT5D75V0akNiex-QZf4XvNrH_Be73K84tng/QJU-6k7QcxE.jpg?size=92x194&quality=95&sign=2c99cd8f3e5564c16b8f7b3e0c55bb3b&type=album",
				title: "средство для мытья посуды Crystal",
				type: "мл",
				weight: "450 мл",
				barcode: "4604049097548",
				manufacturer: "Grifon",
				brand: "AOS",
				quantity: 1,
				careType: [
					"Уход за руками"
				],
				description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ut justo, vestibulum sagittis iaculis iaculis. Quis mattis vulputate feugiat massa vestibulum duis. Faucibus consectetur aliquet sed pellentesque consequat consectetur congue mauris venenatis. Nunc elit, dignissim sed nulla ullamcorper enim, malesuada.",
				price: 48.5
			}],
			totalPrice: 48.5,
			totalQuantity: 1
		}, action)


		expect(result.basketList).toEqual([])
		expect(result.totalPrice).toEqual(0)
		expect(result.totalQuantity).toEqual(0)
	});

})