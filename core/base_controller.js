class BaseController {
  constructor() {
    this.UserService = require("../services/user_service");
    this.ProfileService = require("../services/profile_service");
    this.JobService = require("../services/job_service");
    this.ProposalService = require("../services/proposal_service");
  } 
}

module.exports = BaseController;
