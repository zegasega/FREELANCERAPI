const BaseService = require("../core/base_service");
const db = require("../db/index");
const { Op } = require("sequelize");

class JobService extends BaseService {
  constructor() {
    super(db.Job);
  }

  async createJob(jobData) {
    const { clientId, title, description, hourlyRate, deadline } = jobData;
    const newJob = await this.create({
      clientId,
      title,
      description,
      hourlyRate,
      deadline
    });
    return { message: "Job Created successfully", job: newJob };
  }

  async updateJob(jobId, updateData) {
    const job = await this.findById(jobId);
    if (!job) throw new Error("Job not found");

    await job.update(updateData);
    return { message: "Job updated", job };
  }

  async deleteJob(jobId) {
    const job = await this.findById(jobId);
    if (!job) throw new Error("Job not found");

    await job.destroy();
    return { message: "Job deleted" };
  }

  async getJobsByQuery(query) {
    const where = {};

    if (query.clientId) where.clientId = query.clientId;
    if (query.status) where.status = query.status;
    if (query.title) where.title = { [Op.iLike]: `%${query.title}%` };

    const jobs = await this.model.findAll({ where });
    return jobs;
  }
}

module.exports = new JobService();
