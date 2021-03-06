const Joi = require("joi");

const validator = (schema = {}) => (
    (req) => {
        const errors = [];
        Object.keys(schema).forEach((type) => {
            const validated = Joi.validate(req[type], schema[type], { abortEarly: false });
            if (validated.error) {
                validated.error.details.forEach((error) => {
                    errors.push({
                        status: 400,
                        title: "Bad Parameter",
                        details: error.message,
                        source: req.originalUrl
                    });
                });
            }
        });
        return errors;
    }
);

module.exports = validator;
