import { Property } from 'interfaces';

export const instanceOfProperty = (object: any): object is Property => {
	return (
		'type' in object &&
		'lat' in object &&
		'lon' in object &&
		'baths' in object &&
		'beds' in object &&
		'address' in object &&
		'image' in object &&
		'iframe' in object &&
		'price' in object &&
		'sqm' in object
	);
};
