import express from 'express';
import data from './data.js';
import config from './config';
import dotenv from 'dotenv';
var localPort = 'http://localhost:5000';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose
	.connect(mongodbUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.catch((error) => console.log(error.reason));

const app = express();

app.use('/api/users', userRoute);

app.get('/api/products', (req, res) => {
	res.send(data.products);
});

app.get('/api/products/:id', (req, res) => {
	const productId = req.params.id;
	const product = data.products.find((x) => x._id === productId);

	if (product) res.send(product);
	else res.status(404).send({ msg: 'Product Not Found' });
});

app.listen(5000, () => {
	console.log('Sever started at ' + localPort);
});
