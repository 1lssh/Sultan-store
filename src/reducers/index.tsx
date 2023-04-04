import goodsReducer from "./goodsSlice";
import { configureStore } from "@reduxjs/toolkit";



const store = configureStore({
	reducer: {
		goods: goodsReducer
	}
})

export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatach = typeof store.dispatch;