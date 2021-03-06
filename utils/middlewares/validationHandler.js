const boom = require('@hapi/boom');

function validate() {
    return false
}

function validarionHandler(schema, chek = 'body') {
    return (req, _res, next) => {
        const error = validate(req[chek], schema);
        error ? next(boom.badRequest) : next();
    }
}

module.exports = validarionHandler;