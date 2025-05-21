const BaseController = require("../core/base_controller");

class JobController extends BaseController{
    constructor(){
        super();
    }

    async createJob(req, res) {
        try {
            const jobData = {clientId : req.user.id, ...req.body};
            const result = await this.JobService.createJob(jobData);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new JobController();