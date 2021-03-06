const boom = require('@hapi/boom');
const joi = require('@hapi/joi');

function validate(data, schema) {
    const { error } = joi.object(schema).validate(data);
    return error;
}

function validarionHandler(schema, chek = 'body') {
    return (req, _res, next) => {
        const error = validate(req[chek], schema);
        error ? next(boom.badRequest(error)) : next();
    }
}

module.exports = validarionHandler;