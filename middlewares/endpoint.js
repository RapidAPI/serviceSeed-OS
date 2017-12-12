//const logger = require("../utils/logger");

module.exports = (logic) => (
  async (req, res) => {
    const startTime = Date.now();
    try {
      const beforeData = (logic.before && typeof logic.before === "function")
        ? await logic.before(req)
        : undefined;
      const endpointData = await logic(beforeData || req);
      const afterData = (logic.after && typeof logic.after === "function")
        ? await logic.after(endpointData, req)
        : undefined;
      const resp = afterData || endpointData || {};
      resp.took = Date.now() - startTime;
      resp.status = resp.status || 200;

      return  resp;
    } 
    catch (ex) {
      if (logic.onFail && typeof logic.onFail === "function") {
        await logic.onFail(ex);
      }
      const status = ex.value || 500;
      const errors = [
        {
          status,
          title: ex.message.title || ex.name || "",
          details: ex.message.details || ex.message || "",
          source: req.originalUrl
        }
      ];
      const took = Date.now() - startTime;
      return {status , errors , took };
    }
  }
);