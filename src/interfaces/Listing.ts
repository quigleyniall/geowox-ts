import { Property } from './Property';

export interface Listing {
	details: Property;
	className?: string;
	onEnter?: (details: Property) => void;
	onLeave?: () => void;
	loadModal?: (property: Property) => void;
}
