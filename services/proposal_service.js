const BaseService = require("../core/base_service");
const db = require("../db/index");
const webSocketService = require("./websocket_service");
class ProposalService extends BaseService {
  constructor() {
    super(db.Proposal);
    this.db = db;
    this.webSocketService = webSocketService; // WS servisi

  }

  async createProposal(proposalData) {
    const { jobId, userId, coverLetter, proposedRate } = proposalData;

    const job = await this.db.Job.findByPk(jobId);
    if (!job) {
      throw new Error("Job does not exist.");
    }

    const existingProposal = await this.findOne({
      jobId, userId ,
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
    this.webSocketService.broadcastToUser(job.clientId, {
      type: "new_proposal",
      message: `Job ${jobId} için yeni bir teklif geldi.`,
      proposal: newProposal,
    });

    return {
      message: "Proposal created successfully.",
      data: newProposal,
    };
  }

  async getProposal(query = {}) {
    const proposals = await this.model.findAll({
      where: query,
      include: [
        { model: this.db.Job, as: "job" },
        { model: this.db.User, as: "freelancer" },
      ],
    });

    if (!proposals || proposals.length === 0) {
      throw new Error("Proposal(s) not found.");
    }

    return {
      message: "Success",
      data: proposals,
    };
  }

  async updateProposal(id, updateData) {
    const proposal = await this.findById(id);
    if (!proposal) {
      throw new Error("Proposal not found.");
    }

    const allowedFields = ["coverLetter", "proposedRate", "status"];
    const fieldsToUpdate = {};
    for (const key of allowedFields) {
      if (key in updateData) {
        fieldsToUpdate[key] = updateData[key];
      }
    }

    const updatedProposal = await proposal.update(fieldsToUpdate);

    return {
      message: "Proposal updated successfully.",
      data: updatedProposal,
    };
  }
}

module.exports = new ProposalService();
