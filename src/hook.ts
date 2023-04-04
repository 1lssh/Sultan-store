import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { AppDispatach, RootState } from "./reducers";

export const useAppDispatch = () => useDispatch<AppDispatach>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;