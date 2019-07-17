import React from 'react';
import './Input.scss';

interface Input {
	className?: string;
	type: any;
	placeholder: string;
	value: string;
	onChange(e: React.ChangeEvent<HTMLInputElement>): void;
	icon: boolean;
}

export const Input: React.FC<Input> = (props) => {
	const { className, type, placeholder, value, onChange, icon } = props;
	const elClassName = `form-control ${className}`;

	return icon ? (
		<div className="flex form-group">
			<input
				className={elClassName}
				type={type}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
			/>
			<i className="fas fa-search form-icon" />
		</div>
	) : (
		<input
			className={elClassName}
			type={type}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
};
