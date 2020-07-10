"use strict";

var _express = _interopRequireDefault(require("express"));

var _data = _interopRequireDefault(require("./data.js"));

var _path = _interopRequireDefault(require("path"));

var _config = _interopRequireDefault(require("./config"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _userRoute = _interopRequireDefault(require("./routes/userRoute"));

var _productRoute = _interopRequireDefault(require("./routes/productRoute"));

var _orderRoute = _interopRequireDefault(require("./routes/orderRoute"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _uploadRoute = _interopRequireDefault(require("./routes/uploadRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var localPort = 'http://localhost:5000';

_dotenv["default"].config();

var mongodbUrl = _config["default"].MONGODB_URL;

_mongoose["default"].connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})["catch"](function (error) {
  return console.log(error.reason);
});

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use('/api/users', _userRoute["default"]);
app.use('/api/products', _productRoute["default"]);
app.use('/api/order', _orderRoute["default"]);
app.use('/api/orders', _orderRoute["default"]);
app.use('/api/uploads', _uploadRoute["default"]);
app.get('/api/config/paypal', function (req, res) {
  res.send(_config["default"].PAYPAL_CLIENT_ID);
});
app.use('/uploads', _express["default"]["static"](_path["default"].join(__dirname, '/../uploads')));
app.use(_express["default"]["static"](_path["default"].join(__dirname, '/../client/build')));
app.get('*', function (req, res) {
  res.sendFile(_path["default"].join("".concat(__dirname, "/../client/build/index.html")));
});
app.listen(5000, function () {
  console.log('Sever started at ' + localPort);
});