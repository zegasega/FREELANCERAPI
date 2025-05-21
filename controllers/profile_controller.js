const BaseController = require("../core/base_controller");

class ProfileController extends BaseController{
    constructor(){
        super();
    }

    async CreateClientProfile(req, res){
        try {
            const result = await this.ProfileService.createClientProfile(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({error: error.message});   
        }
    }
    async UpdateClientProfile(req, res) {
        try {
            const clientData = {userId: req.user.id, ...req.body};
            const result = await this.ProfileService.updateClientProfile(clientData);
            res.status(200).json(result);

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async CreateFreelancerProfile(req, res){
        try {
            const result = await this.ProfileService.createFreelancerProfile(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({error: error.message});   
        }
    }
    async UpdateFreelancerProfile(req, res) {
        try {
            const freelancerData = {userId: req.user.id, ...req.body};
            const result = await this.ProfileService.updateFreelancerProfile(freelancerData);
            res.status(200).json(result);

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    
}

module.exports = new ProfileController();