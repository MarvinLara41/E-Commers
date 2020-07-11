import dotenv from 'dotenv';
dotenv.config();

export default {
	MONGODB_URL: process.env.MONGODB_URL,
	JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
	PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'SB',
	MONGODB_URI: process.env.MONGODB_URI,
	PORT: process.env.PORT || 5000,
};
