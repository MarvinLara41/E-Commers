import express from 'express';
import data from './data.js';
import config from './config';
import dotenv from 'dotenv';
var localPort = 'http://localhost:5000';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';
import bodyParser from 'body-parser';

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose
	.connect(mongodbUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.catch((error) => console.log(error.reason));

const app = express();
app.use(bodyParser.json());

app.use('/api/users', userRoute);

app.use('/api/products', productRoute);

app.use('/api/order', orderRoute);

// app.use('/api/orders', orderRoute);

app.get('/api/config/paypal', (req, res) => {
	res.send(config.PAYPAL_CLIENT_ID);
});

app.listen(5000, () => {
	console.log('Sever started at ' + localPort);
});
