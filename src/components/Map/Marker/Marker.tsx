import React from 'react';
import { Listing } from 'components/Property/Listing';
import { Property } from 'interfaces';
import { instanceOfProperty } from 'utils/checkProperty';

interface Marker {
	markerActive: Property | {};
	lat: number;
	lng: number;
	property: Property;
	loadModal(d: Property): void;
	mapPropertyType: string;
	onMarkerHover(d: Property): void;
	onMarkerLeave(): void;
}

export const Marker: React.FC<Marker> = ({
	markerActive,
	property,
	mapPropertyType,
	loadModal,
	onMarkerLeave,
	onMarkerHover,
}) => (
	<div
		className={
			markerActive === property || mapPropertyType === property.type
				? `circle circle-hover circle-${property.type} circle-hover-${
						property.type
				  }`
				: `circle z-index-low circle-${property.type}`
		}
		role="presentation"
		onClick={() => loadModal(property)}
		onMouseOver={() => onMarkerHover(property)}
		onFocus={() => onMarkerHover(property)}
		onMouseLeave={onMarkerLeave}>
		{markerActive === property && instanceOfProperty(markerActive) ? (
			<Listing details={markerActive} className="map-listing" />
		) : null}
	</div>
);
