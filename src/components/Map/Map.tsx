import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Marker } from './Marker/Marker';
import { Property } from 'interfaces';
import { MAP_API_KEY } from 'utils/config';
import './Map.scss';

interface MapProps {
	data: Property[];
	loadModal(property: Property): void;
	mapPropertyType: string;
	showInfoWindow: boolean | Property;
}

interface MapState {
	center: {
		lat: number;
		lng: number;
	};
	markerActive: {} | Property;
}

export class Map extends React.Component<MapProps, MapState> {
	constructor(props: MapProps) {
		super(props);
		this.state = {
			center: {
				lat: 59.95,
				lng: 30.33,
			},
			markerActive: false,
		};
	}

	componentWillReceiveProps(nextProps: MapProps) {
		this.setState({ markerActive: nextProps.showInfoWindow });
	}

	getMapBounds = (map: any, maps: any, locations: any) => {
		const bounds = new maps.LatLngBounds();

		locations.forEach((location: { lat: number; lon: number }) => {
			bounds.extend(new maps.LatLng(location.lat, location.lon));
		});
		return bounds;
	};

	bindResizeListener = (map: any, maps: any, bounds: any) => {
		maps.event.addDomListenerOnce(map, 'idle', () => {
			maps.event.addDomListener(window, 'resize', () => {
				map.fitBounds(bounds);
			});
		});
	};

	apiIsLoaded = (map: any, maps: any, locations: any) => {
		if (map) {
			const bounds = this.getMapBounds(map, maps, locations);
			map.fitBounds(bounds);
			this.bindResizeListener(map, maps, bounds);
		}
	};

	renderMarkers = (): any => {
		const { data, loadModal, mapPropertyType } = this.props;
		const { markerActive } = this.state;
		return data.map(d => (
			<Marker
				lat={d.lat}
				lng={d.lon}
				property={d}
				markerActive={markerActive}
				loadModal={loadModal}
				mapPropertyType={mapPropertyType}
				onMarkerHover={this.onMarkerHover}
				onMarkerLeave={this.onMarkerLeave}
			/>
		));
	};

	onMarkerHover = (markerActive: Property): void => {
		this.setState({ markerActive });
	};

	onMarkerLeave = (): void => {
		this.setState({ markerActive: {} });
	};

	render() {
		const { center } = this.state;
		const { data } = this.props;
		if (typeof MAP_API_KEY === 'string') {
			return (
				<div style={{ height: '100%', width: '100%' }}>
					<GoogleMapReact
						zoom={16}
						center={center}
						yesIWantToUseGoogleMapApiInternals
						onGoogleApiLoaded={({ map, maps }) =>
							this.apiIsLoaded(map, maps, data)
						}
						bootstrapURLKeys={{
							key: MAP_API_KEY,
						}}>
						{this.renderMarkers()}
					</GoogleMapReact>
				</div>
			);
		}
		return null;
	}
}
