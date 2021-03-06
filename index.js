const express = require('express');
const app = express();
const { config } = require('./config/index');
const moviesApi = require('./routes/movies');
const {
  logErrors,
  errorHandler,
  wrapError,
} = require('./utils/middlewares/errorHandlers');
const notFoundHandler = require('./utils/middlewares/notFoundHandler');

// body parser
app.use(express.json());

// set movies api router
moviesApi(app);

// catch 404
app.use(notFoundHandler);

// errors handlers
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);

app.listen(config.port);
