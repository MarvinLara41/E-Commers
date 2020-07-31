const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	JWT_SECRET: process.env.JWT_SECRET || 'secret',
	PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
	MONGODB_URI: process.env.MONGODB_URI,
};
