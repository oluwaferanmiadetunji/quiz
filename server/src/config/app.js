const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const home = require('../routes/home');
const auth = require('../routes/auth');
const quiz = require('../routes/quiz');
const user = require('../routes/user');
const course = require('../routes/course');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

let morganFunction = function (tokens, req, res) {
	return [
		tokens.method(req, res),
		tokens.url(req, res),
		tokens.status(req, res),
		tokens.res(req, res, 'content-length'),
		'-',
		tokens['response-time'](req, res),
		'ms',
	].join(' ');
};
app.use(morgan(morganFunction));

app.use('/', home);
app.use('/', auth);
app.use('/', quiz);
app.use('/', user);
app.use('/', course);

module.exports = app;
