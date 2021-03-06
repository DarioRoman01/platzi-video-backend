const boom = require('@hapi/boom');
const { config } = require('../../config/index');

function withErrorStack(error, stack) {
    if (config.dev) {
        return { ...error, stack }
    }
    return error;
}

function logErrors(err, _req, _res, next) {
    console.log(err);  // eslint-disable-line
    next(err);
}

function wrapError(err, _req, _res, next) {
    if (!err.isBoom) {
        next(boom.badImplementation(err));
    }
    next(err);
}

function errorHandler(err, req, res, next) {  // eslint-disable-line
    const { output: {statusCode, payload} } = err;
    res.status(statusCode);
    res.json(withErrorStack(payload, err.stack));
}

module.exports = {
    logErrors,
    wrapError,
    errorHandler
}