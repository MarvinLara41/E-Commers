import express from 'express';
import data from './data.js';
import path from 'path';
import config from './config';
import dotenv from 'dotenv';
var localPort = 'http://localhost:5000';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';
import bodyParser from 'body-parser';
import uploadRoute from './routes/uploadRoute';

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose
	.connect(mongodbUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.catch((error) => console.log(error.reason));

const app = express();
app.use(bodyParser.json());

app.use('/api/users', userRoute);

app.use('/api/products', productRoute);

app.use('/api/order', orderRoute);

app.use('/api/orders', orderRoute);

app.use('/api/uploads', uploadRoute);

app.get('/api/config/paypal', (req, res) => {
	res.send(config.PAYPAL_CLIENT_ID);
});

app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));

app.use(express.static(path.join(__dirname, '/../client/build')));

app.get('*', (req, res) => {
	res.sendFile(path.join(`${__dirname}/../client/build/index.html`));
});

app.listen(5000, () => {
	console.log('Sever started at ' + localPort);
});
