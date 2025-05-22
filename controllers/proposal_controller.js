const BaseController = require("../core/base_controller");

class ProposalController extends BaseController {
  constructor() {
    super();
  }

  async CreateProposal(req, res) {
    try {
      const proposalData = {
        userId: req.user.id,
        ...req.body,
      };
      const result = await this.ProposalService.createProposal(proposalData);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async GetProposalById(req, res) {
    try {
      const proposalId = req.params.id;
      const result = await this.ProposalService.getProposalById(proposalId);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async GetProposalsByUser(req, res) {
    try {
      const userId = req.user.id;
      const result = await this.ProposalService.getProposalsByUser(userId);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async GetProposalsByJob(req, res) {
    try {
      const jobId = req.params.jobId;
      const result = await this.ProposalService.getProposalsByJob(jobId);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ProposalController();
