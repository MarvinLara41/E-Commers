const express = require('express');
const path = require('path');
const config = require('./config');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoute');
const bodyParser = require('body-parser');
const uploadRoute = require('./routes/upLoadRoute');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
} else {
	app.use(express.static('client/public'));
}

const mongodbURI = config.MONGODB_URI;

mongoose
	.connect(mongodbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.catch((error) => console.log(error.reason));

// API
app.use('/api/uploads', uploadRoute);

app.use('/api/users', userRoute);

app.use('/api/products', productRoute);

app.use('/api/orders', orderRoute);

app.get('/api/config/paypal', (req, res) => {
	res.send(config.PAYPAL_CLIENT_ID);
});

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.listen(PORT, function () {
	console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

module.exports = app;
