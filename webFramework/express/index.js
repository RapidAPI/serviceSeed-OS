const Express = require("express");

const { filtersWraperMiddleware, validatorWraperMiddleWare, endpointWraperMiddleware } = require("./middlewareWrapers")
const app = new Express();

let express = {};

express.listen = (port, callback) => {
    app.listen(port, (error) => {
        if (error) {
            callback(error);
        } else {
            callback(`service listening on  ${port}`);
        }
    });
}

express.expose = (method, routeName, logic, validations) => {
    app[method](routeName, filtersWraperMiddleware(),
        validatorWraperMiddleWare(validations),
        endpointWraperMiddleware(logic));
}

express.init = () =>{
}

module.exports = express;