import React from 'react';
import { Pie } from 'components/Chart/Pie';
import './Modal.scss';
import { Property } from './Property/Property';
import { Property as PropertyInt } from 'interfaces';

interface Modal {
	data: PropertyInt[];
	details: PropertyInt;
	onClose(): void;
	renderSimilar(): JSX.Element[] | JSX.Element;
}

export const Modal: React.FC<Modal> = props => {
	const { details, onClose, data, renderSimilar } = props;
	return (
		<div className="modal-wrapper">
			<div className="modal-container">
				<i
					className="fas fa-times close-icon"
					onClick={onClose}
					onKeyDown={onClose}
					role="presentation"
				/>
				<Property listing={details} />
				<div className="property-header fw-bold">
					Similar Properties
				</div>
				<div className="similar-property-container">
					{renderSimilar()}
				</div>
				<div className="property-header fw-bold">
					Breakdown of your Search in the Area
				</div>
				<div className="text-center">
					<Pie pieData={data} />
				</div>
			</div>
		</div>
	);
};
