class BaseController {
  constructor() {
    this.UserService = require("../services/user_service");
    this.ProfileService = require("../services/profile_service");
  }
}

module.exports = BaseController;
