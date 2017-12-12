// TODO: Add validation for filters
const filters = (query) => {
    const fields = {
        order: {},
        query: {},
        page: {},
        limit: {},
        include: {
            validator: val => (!Array.isArray(val) ? [val] : val)
        },
        attributes: {}
    };

    const jsonify = (str) => {
        try {
            return JSON.parse(str);
        } catch (ex) {
            return str;
        }
    };

    return Object.keys(fields).reduce((acc, type) => {
        const conf = fields[type];
        let val = jsonify(query[type]);
        if (conf.validator &&
            typeof conf.validator === "function") {
            val = conf.validator(val);
        }
        if (query[type]) {
            acc[type] = val;
        }
        return acc;
    }, {});
};
module.exports = filters;
