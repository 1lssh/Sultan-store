import { fireEvent, screen } from '@testing-library/react';
import { ToBasketBtn } from './components/ToBasketBtn';
import App from './App';
import { renderWithProvider } from '../src/test helpers/renderWithProvider';
import * as actions from './reducers/goodsSlice'
import { CatalogPage } from './pages/CatalogPage';


describe('testing components', () => {
	test('add field should not to be in the document by default', () => {
		renderWithProvider(<CatalogPage />)

		const buttonElement = screen.queryByText(/добавить/i);
		expect(buttonElement).not.toBeInTheDocument();
	});

	test('add button should not to be in the document after clicking', () => {
		renderWithProvider(<CatalogPage />)

		const showAddFieldBtn = screen.getByTestId('show-add-field-btn')
		expect(showAddFieldBtn).toBeInTheDocument()
		fireEvent.click(showAddFieldBtn)
		expect(showAddFieldBtn).not.toBeInTheDocument()

	});

	test('to basket button snapshot', () => {
		renderWithProvider(<ToBasketBtn />)

		const buttonElement = screen.getByRole('button');
		expect(buttonElement).toMatchSnapshot();
	});

	test('should direct to basket page', () => {
		renderWithProvider(<App />, '/basket')
		expect(screen.getByTestId("basket-page")).toBeInTheDocument()
	});

	test('should direct to catalog page', () => {
		renderWithProvider(<App />)
		expect(screen.getByTestId("catalog-page")).toBeInTheDocument()
	});

	test('should direct to product card page', () => {
		renderWithProvider(<App />, '/4604049097558')
		expect(screen.getByTestId("product-card-page")).toBeInTheDocument()
	});

	test('cards length should be <= 15', () => {
		renderWithProvider(<CatalogPage />)
		const productCard = screen.getAllByTestId('product-card')
		expect(productCard.length).toBeLessThanOrEqual(15)
	});

	test('should increment and decrement quantity', () => {
		renderWithProvider(<App />, '/4604049097558')

		const incrementBtn = screen.getByTestId('increment')
		const decrementBtn = screen.getByTestId('decrement')
		const counter = screen.getByTestId('counter')
		expect(counter.textContent).toBe('1')
		fireEvent.click(decrementBtn)
		expect(counter.textContent).toBe('1')
		fireEvent.click(incrementBtn)
		expect(counter.textContent).toBe('2')
		fireEvent.click(decrementBtn)
		expect(counter.textContent).toBe('1')

	});

	test('should dispatch action', () => {
		const mockedAction = jest.spyOn(actions, 'deleteProduct')
		renderWithProvider(<CatalogPage />)
		fireEvent.click(screen.getAllByTestId('img')[0])
		expect(mockedAction).toHaveBeenCalledWith('4604049097558')
		expect(mockedAction).toHaveBeenCalledTimes(1)
	});


})




