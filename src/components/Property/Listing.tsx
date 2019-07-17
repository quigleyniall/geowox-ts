import React from 'react';
import { Listing as ListingInt } from 'interfaces';
import './Listing.scss';

export const Listing: React.FC<ListingInt> = ({
	details,
	className,
	onEnter,
	onLeave,
	loadModal,
}) => (
	<div
		className={`listing-container ${className}`}
		onMouseOver={onEnter ? () => onEnter(details) : undefined}
		onFocus={onEnter ? () => onEnter(details) : undefined}
		onMouseLeave={onLeave}
		role="presentation"
		onClick={loadModal ? () => loadModal(details) : undefined}>
		<div className="listing-image-container">
			<img
				src={details.image}
				alt="Not found!"
				className="listing-image"
			/>
		</div>
		<div className="listing-main">
			<span className="listing-price listing-details">
				€{details.price}
			</span>
			<span className="listing-info listing-details">
				{details.beds} bds
			</span>
			<span className="listing-info listing-details">
				{details.baths} ba
			</span>
			<span className="listing-info listing-details">
				{details.sqm} sqm
			</span>
		</div>
		<div className="listing-address">{details.address}</div>
	</div>
);
