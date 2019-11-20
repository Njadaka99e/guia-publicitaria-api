const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const chalk = require('chalk');
const morgan = require('morgan');
const errorHandler = require('./middlewares/error');
const fileUpload = require('express-fileupload');
const path = require('path')
// routers
const negocio = require('./routes/negocio');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
    morgan((tokens, req, res) => {
      return (
          chalk.yellow.bold('Morgan ->') +
          ' ' +
          chalk.blue(tokens.method(req, res)) +
          ' ' +
          chalk.green(tokens.url(req, res)) +
          ' ' +
          chalk.red(tokens['response-time'](req, res))
      );
    })
);
// Subir archivos
app.use(fileUpload());
// Folder estatico
app.use(express.static(path.join(__dirname, 'public')));
// routers
app.use('/api/v1/negocio', negocio);

app.use(errorHandler);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
