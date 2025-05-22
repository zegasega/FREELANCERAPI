const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user_controller");
const ProfileController = require("../controllers/profile_controller");
const authMiddleware = require("../middleware/auth");
const roleMiddleware  = require("../middleware/role");
const JobController = require("../controllers/job_controller");

const PorposalController = require("../controllers/proposal_controller")
// AUTH ROUTES
router.post("/auth/register", (req, res) => UserController.Register(req, res));
router.post("/auth/login", (req, res) => UserController.Login(req, res));
router.post("/auth/logout", authMiddleware ,(req, res) => UserController.Logout(req, res));


// USER ROUTES
router.get("/users", authMiddleware ,(req, res) => UserController.GetAllUsers(req, res));
router.get("/users/:id", authMiddleware ,(req, res) => UserController.GetUserByID(req, res));


// CLİENT PROFILE
router.post("/client/profile", authMiddleware, roleMiddleware("client"), (req, res) =>
  ProfileController.CreateClientProfile(req, res));
router.put("/client/profile", authMiddleware, roleMiddleware("client"), (req, res) =>
  ProfileController.UpdateClientProfile(req, res));


// FREELANCER PROFILE
router.post("/freelance/profil", authMiddleware, roleMiddleware("freelancer"), (req, res) =>
  ProfileController.CreateFreelancerProfile(req, res)
);
router.put("/freelance/profil", authMiddleware, roleMiddleware("freelancer"), (req, res) =>
  ProfileController.UpdateFreelancerProfile(req, res)
);

// JOBS
router.post("/job", authMiddleware, roleMiddleware("client"), (req, res) => JobController.createJob(req, res));
router.put("/job/:id", authMiddleware, roleMiddleware("client"), (req, res) => JobController.updateJob(req, res));
router.delete("/job/:id", authMiddleware, roleMiddleware("client"), (req, res) => JobController.deleteJob(req, res));
router.get("/job", authMiddleware, roleMiddleware("client"), (req, res) => JobController.getJobs(req, res));


// PROPOSAL

router.post("/proposal", authMiddleware, roleMiddleware("freelancer"), (req, res) => PorposalController.CreateProposal(req, res));


module.exports = router;
