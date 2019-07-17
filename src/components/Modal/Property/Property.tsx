import React from 'react';
import logo from 'assets/logo.jpg';
import { Property as PropertyInt } from 'interfaces';
import './Property.scss';

interface Listing {
	listing: PropertyInt;
}

export const Property: React.FC<Listing> = ({ listing }) => (
	<div className="property-container">
		<div className="property-image-container">
			<img
				src={listing.image}
				alt="unavailable"
				className="property-image"
			/>
		</div>
		<div className="property-details">
			<div className="property-logo-container">
				<img src={logo} alt="geowox" className="property-logo" />
			</div>
			<div className="primary-color fw-bold padding text-center">
				€{listing.price}
			</div>
			<div className="text-center">{listing.address}</div>
			<div className="property-header fw-bold">Overview</div>
			<div className="padding">
				<span className="fw-bold">Property Type</span>:{' '}
				<span>{listing.type}</span>
			</div>
			<div className="padding">
				<span className="fw-bold">Beds</span>:{' '}
				<span>{listing.beds}</span>
			</div>
			<div className="padding">
				<span className="fw-bold">Baths</span>:{' '}
				<span>{listing.baths}</span>
			</div>
			<div className="padding">
				<span className="fw-bold">SQM</span>: <span>{listing.sqm}</span>
			</div>
		</div>
	</div>
);
