import { FC } from "react";
interface IChangebleCardFieldProps {
	info: string | number
	edit: boolean
	newInfo: string | number
	setNewInfo: (text: any) => void
};

export const ChangebleCardField: FC<IChangebleCardFieldProps> = (props) => {
	return (
		<>
			{
				!props.edit ? props.info
					: <input value={props.newInfo} onChange={(e) => props.setNewInfo(e.currentTarget.value)} type='text' />
			}
		</>
	);
}
