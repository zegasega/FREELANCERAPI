const BaseService = require("../core/base_service");
const db = require("../db/index");
const { Op } = require("sequelize");

class JobService extends BaseService {
  constructor() {
    super(db.Job);
    this.db = db;
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
    if (!job) throw new Error("Job Not Found!");

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

  async assignFreelancer(jobId, freelancerId) {
    const job = await this.findById(jobId);
    if (!job) {
      throw new Error("Job not found!");
    }
    

    if (job.status !== "open") {
      throw new Error("Job is not open for assignment");
    }

    const proposal = await this.db.Proposal.findOne({

            jobId,
            userId: freelancerId,
            status: "pending"
        
    });

    if (!proposal) {
      throw new Error("Proposal not found");
    }

    proposal.status = "accepted";
    await proposal.save();

    job.assignedFreelancerId = freelancerId; 
    await job.save();

    return { message: "Freelancer assigned successfully", job };
  }

}

module.exports = new JobService();
