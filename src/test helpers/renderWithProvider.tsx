import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import store from "../reducers"
import { render } from "@testing-library/react"



export const renderWithProvider = (component: any, initialRoute = '/') => {
	return (
		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={[initialRoute]}>
					{component}
				</MemoryRouter>
			</Provider>
		)

	)
}