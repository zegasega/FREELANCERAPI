const BaseController = require("../core/base_controller");

class UserController extends BaseController {
  constructor() {
    super();  
  }

  async Register(req, res) {  
    try {
      const result = await this.UserService.createUser(req.body);  
      res.status(201).json(result); 
    } catch (error) {
      res.status(400).json({ error: error.message });  
    }
  }
  async Login(req, res) {
    try {
        const result = await this.UserService.loginUser(req.body);
        res.status(200).json(result); 
    } catch (error) {
        res.status(400).json({ error: error.message });   
    }
  }
  async Logout(req, res) {
    try {
        const result = await this.UserService.logoutUser(req.user.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });   

    }
  }
  async GetAllUsers(req, res) {
    try {
      const result = await this.UserService.getAllUsers();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async GetUserByID(req, res) {
    try {
      const userId = req.params.id;
      const result = await this.UserService.getUserByID(userId);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}


module.exports = new UserController();
