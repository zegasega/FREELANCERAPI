const BaseController = require("../core/base_controller");

class JobController extends BaseController {
  constructor() {
    super();
  }

  async createJob(req, res) {
    try {
      const jobData = { clientId: req.user.id, ...req.body };
      const result = await this.JobService.createJob(jobData);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateJob(req, res) {
    try {
      const jobId = req.params.id;
      const result = await this.JobService.updateJob(jobId, req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteJob(req, res) {
    try {
      const jobId = req.params.id;
      const result = await this.JobService.deleteJob(jobId);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getJobs(req, res) {
    try {
      const result = await this.JobService.getJobsByQuery(req.query);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new JobController();
