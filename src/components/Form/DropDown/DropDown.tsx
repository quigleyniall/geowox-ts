import React from 'react';
import { Button } from 'components/Button/Button';
import './DropDown.scss';

interface DropDownOptions {
	dropDownOptions: (string | number)[];
	visible: boolean;
	title: string;
	type: string;
	dropDownFn(value: string | number): void;
	highlight: string[] | string | number;
}

export const DropDown: React.FC<DropDownOptions> = ({
	dropDownOptions,
	visible,
	title,
	type,
	dropDownFn,
	highlight,
}): JSX.Element => {
	const renderCheckBoxOptions =
		type === 'checkbox'
			? dropDownOptions.map(option => {
					if (
						highlight instanceof Array &&
						typeof option === 'string'
					) {
						return (
							<div
								className="checkbox-container"
								onClick={() => dropDownFn(option)}
								role="presentation">
								{highlight.includes(option) ? (
									<i className="far fa-check-square" />
								) : (
									<i className="far fa-square" />
								)}
								<div
									className="checkbox-label"
									style={{ marginLeft: '10px' }}>
									{option}
								</div>
							</div>
						);
					}
			  })
			: null;

	const renderSingleOptions =
		type === 'single'
			? dropDownOptions.map(option => (
					<div className="button-container">
						<Button
							text={option}
							type="submit"
							clicked={highlight === option}
							onPress={() => dropDownFn(option)}
							className="btn-dropdown"
						/>
					</div>
			  ))
			: null;

	return (
		<div className={visible ? 'dropdown show' : 'dropdown hide'}>
			<div className="dropdown-title">{title}</div>
			<div className={type === 'checkbox' ? 'd-block' : 'd-flex'}>
				{renderCheckBoxOptions}
				{renderSingleOptions}
			</div>
		</div>
	);
};
