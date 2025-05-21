const BaseService = require("../core/base_service");
const db = require("../db/index");

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
      deadline,
    });

    return {
      message: "Job Created Successfully",
      job: newJob,
    };
  }

  async getJobById(id) {
    const job = await this.findById(id, {
      include: [
        {
          model: db.User,
          as: "client",
          attributes: ["id", "username", "email"],
        },
      ],
    });

    if (!job) {
      throw new Error("Job not found");
    }

    return job;
  }

  async getJobs(query = {}) {
    const where = {};

    if (query.title) {
      where.title = { [db.Sequelize.Op.iLike]: `%${query.title}%` };
    }

    if (query.clientId) {
      where.clientId = query.clientId;
    }

    const jobs = await this.findAll({
      where,
      include: [
        {
          model: db.User,
          as: "client",
          attributes: ["id", "username", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return jobs;
  }

  async updateJob(id, data) {
    const updated = await this.update(id, data);
    if (!updated) {
      throw new Error("Job not found or update failed");
    }
    return {
      message: "Job updated successfully",
      updatedJob: updated,
    };
  }

  async deleteJob(id) {
    const deleted = await this.delete(id);
    if (!deleted) {
      throw new Error("Job not found or delete failed");
    }
    return {
      message: "Job deleted successfully",
    };
  }
}

module.exports = new JobService();