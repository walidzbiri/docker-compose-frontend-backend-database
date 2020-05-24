const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const userRouter = require('./api/routes/user');
const indexRouter = require('./api/routes/index');
const authRouter = require('./api/auth/index');

const { isLoggedIn } = require('./api/middlewares/auth');

const app = express();
app.use(cors({
  origin: 'http://localhost:5500',
  credentials: true,
}));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// adding routes middleware
app.use('/auth', authRouter);
app.use('/', indexRouter);
app.use('/api/v1/user', isLoggedIn, userRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {},
  });
});

module.exports = app;
