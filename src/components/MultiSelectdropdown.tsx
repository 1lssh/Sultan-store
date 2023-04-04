import { FC } from "react";
interface IMultiSelectDropdownProps {
	selected: any
	toggleOption: any
};

const data = [
	"Уход за руками",
	"Уход за лицом",
	"Уход за телом",
	"Уход за ногами",
	"Уход за волосами",
]

export const MultiSelectDropdown: FC<IMultiSelectDropdownProps> = ({ selected, toggleOption }) => {
	return (
		<div className="c-multi-select-dropdown">
			<div className="c-multi-select-dropdown__selected">
				<div> Выбрано {selected.length}</div>

			</div>
			<ul className="c-multi-select-dropdown__options">
				{data.map((option: string) => {
					const isSelected = selected.includes(option);

					return (
						<li key={option} className="c-multi-select-dropdown__option" onClick={() => toggleOption(option)}>
							<input type="checkbox" checked={isSelected} readOnly className="c-multi-select-dropdown__option-checkbox"></input>
							<span>{option}</span>
						</li>
					)
				})}
			</ul>
		</div>
	);
}


