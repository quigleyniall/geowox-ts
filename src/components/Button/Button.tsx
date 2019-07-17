import React from 'react';
import './Button.scss';

interface Button {
	onPress(): void;
	type: any;
	text: string | number;
	className?: string;
	selected?: number | string | string[];
	clicked?: boolean;
}

export const Button: React.FC<Button> = ({
	onPress,
	type,
	text,
	className,
	selected,
	clicked,
}) => (
	<button
		onClick={onPress}
		className={
			clicked ? `btn btn-clicked ${className}` : `btn ${className}`
		}
		type={type}>
		{typeof selected === 'number' ? `${text}: ${selected}` : text}
	</button>
);
