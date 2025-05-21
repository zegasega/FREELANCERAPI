const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user_controller");
const ProfileController = require("../controllers/profile_controller");
const authMiddleware = require("../middleware/auth");
const roleMiddleware  = require("../middleware/role");

// AUTH ROUTES
router.post("/auth/register", (req, res) => UserController.Register(req, res));
router.post("/auth/login", (req, res) => UserController.Login(req, res));
router.post("/auth/logout", authMiddleware ,(req, res) => UserController.Logout(req, res));


// USER ROUTES
router.get("/users", authMiddleware ,(req, res) => UserController.GetAllUsers(req, res));
router.get("/users/:id", authMiddleware ,(req, res) => UserController.GetUserByID(req, res));


// CLİENT PROFİLE
router.post("/client/profile", authMiddleware, roleMiddleware("freelancer", "client") ,(req, res) => ProfileController.CreateClientProfile(req, res));
router.put("/client/profile", authMiddleware , roleMiddleware("freelancer", "client"),(req, res) => ProfileController.UpdateClientProfile(req, res));

// FREELANCER PROFİLE
router.post("/freelance/profil", authMiddleware ,(req, res) => ProfileController.CreateFreelancerProfile(req, res));
router.put("/freelance/profil", authMiddleware ,(req, res) => ProfileController.UpdateFreelancerProfile(req, res));


module.exports = router;