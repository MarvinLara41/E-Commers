const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
	PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
	MONGODB_URI: process.env.MONGODB_URI,
	PORT: process.env.PORT || 5000,
	HOST: process.env.HOST,
};
