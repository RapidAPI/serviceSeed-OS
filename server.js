const webFramework = require("./webFramework/Interface")
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const exepetions = require("./utils/exeptions");

module.exports.exepetions = exepetions;

let seed = (exports = module.exports = { config: {} });

seed.setConfig = ({ port, webFramework, }) => {
    seed.config.webFramework = webFramework;
    seed.config.port = port;
}

seed.init = () => {
    webFramework.init(seed.config);

    const pingEndpoint = {
        routeName: "/ping",
        endpoint: () => { return { status: 200, payload: "pong" } },
        method: "get"
    };

    seed.routes([pingEndpoint]);

    if (seed.config.enableClusters) {
        seed.enableClusters();
    }

    if (seed.config.enableSwagger) {
        seed.enableSwagger()
    }
}


seed.routes = (routes) => {
    routes.forEach(route => {
        const { routeName, endpoint, validations = {}, method } = route;
        webFramework.expose(method, routeName, endpoint, validations)
    });
}

seed.listen = (callback) => {
    try {
        webFramework.listen(seed.config, callback);
    }
    catch (e) {
        callback(e);
    }
}