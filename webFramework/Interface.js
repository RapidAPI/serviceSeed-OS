const express = require("./express");

let webFramework = (exports = module.exports = {});

webFramework.frameworkSelections = {
    express
};

webFramework.listen = (config, callback) => {
    webFramework.framework.listen(config.port, callback);
};

webFramework.expose = (method, routeName, logic, validations) => {
    webFramework.framework.expose(method, routeName, logic, validations);
};

webFramework.init = (config) =>{
    webFramework.framework = webFramework.frameworkSelections[config.webFramework.toLowerCase()] || express;
    webFramework.framework.init(config);
}