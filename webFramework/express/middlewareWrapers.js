const { endpoint, filters, validator } = require("../../middlewares")

//TODO check this
module.exports.validatorWraperMiddleWare = (validations) => (
    (req, res, next) => {
        const errors = validator(validations)(req);
        if (errors.length) {
            return res.status(400).send({ errors })
        }
        return next();
    }
);

module.exports.filtersWraperMiddleware = () => (
    (req, res, next) => {
        req.filters = filters(req.query);
        Object.keys(req.filters).forEach((f) => {
            delete req.query[f];
        });
        return next();
    }
);

module.exports.endpointWraperMiddleware = (logic) => (
    async (req, res) => {
        const midlleWareResponse = await endpoint(logic)(req)
        if (midlleWareResponse.status > 299 || midlleWareResponse.status < 200) {
            return res.status(midlleWareResponse.status).send(
                { errors: midlleWareResponse.errors, took }
            );
        }
        return res.status(midlleWareResponse.status).send(midlleWareResponse);
    }


);
