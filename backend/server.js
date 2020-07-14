import express from 'express';
import path from 'path';
import config from './config';
const PORT = process.env.PORT || 5000;
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';
import bodyParser from 'body-parser';
import uploadRoute from './routes/uploadRoute';

const app = express();

const mongodbURI = config.MONGODB_URI;

mongoose
	.connect(mongodbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.catch((error) => console.log(error.reason));

app.use(bodyParser.json());

app.use('/api/uploads', uploadRoute);

app.use('/api/users', userRoute);

app.use('/api/products', productRoute);

app.use('/api/orders', orderRoute);

app.get('/api/config/paypal', (req, res) => {
	res.send(config.PAYPAL_CLIENT_ID);
});

app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));

app.use(express.static(path.join(__dirname, '/../client/build')));

app.get('*', (req, res) => {
	res.sendFile(path.join(`${__dirname}/../client/build/index.html`));
});

app.listen(config.PORT, () => {
	console.log('Server started at http://localhost:5000');
});
