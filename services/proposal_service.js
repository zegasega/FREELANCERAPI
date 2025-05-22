const BaseService = require("../core/base_service");
const db = require("../db/index");

class ProposalService extends BaseService {
  constructor() {
    super(db.Proposal);
    this.db = db;
  }

  async createProposal(proposalData) {
    const { jobId, userId, coverLetter, proposedRate } = proposalData;

    const job = await this.db.Job.findByPk(jobId);
    if (!job) {
      throw new Error("Job does not exist.");
    }

    const existingProposal = await this.findOne({
      jobId,
      userId,
    });
    if (existingProposal) {
      throw new Error("You have already submitted a proposal for this job.");
    }

    const newProposal = await this.create({
      jobId,
      userId,
      coverLetter,
      proposedRate,
      status: "pending",
    });

    return {
      message: "Proposal created successfully.",
      data: newProposal,
    };
  }

  async getProposalById(id) {
    const proposal = await this.findById(id);
    if (!proposal) {
      throw new Error("Proposal not found.");
    }
    return {
      message: "Success",
      data: proposal,
    };
  }

  async getProposalsByUser(userId) {
    const proposals = await this.findAll({
      userId,
    });

    return {
      message: "Success",
      data: proposals,
    };
  }

  async getProposalsByJob(jobId) {
    const proposals = await this.findAll({
      jobId,
    });

    return {
      message: "Success",
      data: proposals,
    };
  }
}

module.exports = new ProposalService();
