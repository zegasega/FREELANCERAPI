const BaseService = require("../core/base_service");
const db = require("../db/index");

class ProfileService extends BaseService {
    constructor() {
        super(); 
        this.db = db;
    }

    // --------- CLIENT METHODS --------- //

    async createClientProfile(clientData) {
        const { userId, companyName, website, about, hiringGoal, hourlyPay } = clientData;

        const user = await this.db.User.findByPk(userId);
        if (!user) throw new Error("User not found");
        if (user.role !== "client") throw new Error("This user is not a client");

        const existingProfile = await this.db.ClientProfile.findOne({ where: { userId } });
        if (existingProfile) throw new Error("Client profile already exists");

        const newClientProfile = await this.db.ClientProfile.create({
            userId,
            companyName,
            website,
            about,
            hiringGoal,
            hourlyPay,
        });

        return { message: "Client profile created", data: newClientProfile };
    }

    async updateClientProfile(clientData) {
        const { userId, companyName, website, about, hiringGoal, hourlyPay } = clientData;

        const user = await this.db.User.findByPk(userId);
        if (!user) throw new Error("User not found");
        if (user.role !== "client") throw new Error("This user is not a client");

        const existingProfile = await this.db.ClientProfile.findOne({ where: { userId } });
        if (!existingProfile) throw new Error("Client profile not found");

        await existingProfile.update({
            companyName,
            website,
            about,
            hiringGoal,
            hourlyPay,
        });

        return { message: "Client profile updated", data: existingProfile };
    }

    // --------- FREELANCER METHODS --------- //

    async createFreelancerProfile(freelancerData) {
        const { userId, title, bio, experienceYears, hourlyRate } = freelancerData;

        const user = await this.db.User.findByPk(userId);
        if (!user) throw new Error("User not found");
        if (user.role !== "freelancer") throw new Error("This user is not a freelancer");

        const existingProfile = await this.db.FreelancerProfile.findOne({ where: { userId } });
        if (existingProfile) throw new Error("Freelancer profile already exists");

        const newFreelancerProfile = await this.db.FreelancerProfile.create({
            userId,
            title,
            bio,
            experienceYears,
            hourlyRate,
        });

        return { message: "Freelancer profile created", data: newFreelancerProfile };
    }

    async updateFreelancerProfile(freelancerData) {
        const { userId, title, bio, experienceYears, hourlyRate } = freelancerData;

        const user = await this.db.User.findByPk(userId);
        if (!user) throw new Error("User not found");
        if (user.role !== "freelancer") throw new Error("This user is not a freelancer");

        const existingProfile = await this.db.FreelancerProfile.findOne({ where: { userId } });
        if (!existingProfile) throw new Error("Freelancer profile not found");

        await existingProfile.update({
            title,
            bio,
            experienceYears,
            hourlyRate,
        });

        return { message: "Freelancer profile updated", data: existingProfile };
    }
}

module.exports = new ProfileService();
