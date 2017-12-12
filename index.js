//const seed = require("endpoint-seed");

//serviceUsageExample
const cluster     = require('cluster');
const seed = require("./server");
const joi = require("joi");
const { NODE_ENV = "" } = process.env;

const helloEndPoint = {
    endpoint: async () => {
        return { status: 200, data: "Hello" };
    },
    validations: {
        query: { a: joi.string().required() }
    }
};

const routes =

    [{
        routeName: "/v2/hello",
        endpoint: helloEndPoint.endpoint,
        validations: helloEndPoint.validations,
        method: "get"
    }
    ];

seed.setConfig({ port: "8080", webFramework: "express" , enableClusters: cluster.isMaster && NODE_ENV !== "test" , enableSwagger : NODE_ENV !== "production"});
seed.init();
seed.routes(routes);
seed.listen((error) => { if (error) { console.log(error) } });


