import * as dotenv from 'dotenv';

dotenv.config();
let path;
switch (process.env.NODE_ENV) {
	case 'test':
		path = `${__dirname}/../../.env.test`;
		break;
	case 'production':
		path = `${__dirname}/../../.env.production`;
		break;
	default:
		path = `${__dirname}/../../.env.development`;
}
console.log(path);
dotenv.config({ path: path });

export const MAP_API_KEY = process.env.REACT_APP_MAP_API_KEY;
