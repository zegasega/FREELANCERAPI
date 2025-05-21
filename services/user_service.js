const BaseService = require("../core/base_service");
const db = require("../db/index");

class UserService extends BaseService {
  constructor() {
    super(db.User);
  }

  async createUser(userData) {
    const { username, email, password, role } = userData;

    const existingUser = await this.findOne({ email });
    if (existingUser) {
      throw new Error("This email is already in use.");
    }

    const hashedPassword = await this.Utils.hashPassword(password);

    const newUser = await this.create({
      username,
      email,
      password: hashedPassword,
      role,
      jwtTokenVersion: 0,
    });

    return {
      message: "User created successfully.",
      data: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    };
  }

  async loginUser({ email, password }) {
    const user = await this.findOne({ email });
    if (!user) {
      throw new Error("No user found with this email.");
    }

    const isPasswordValid = await this.Utils.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Incorrect password.");
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      jwtTokenVersion: user.jwtTokenVersion,
    };

    const accessToken = this.Utils.generateAccessToken(payload);
    const refreshToken = this.Utils.generateRefreshToken(payload);

    return {
      message: "Login successful.",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }

  async logoutUser(userID) {
    const user = await this.findById(userID);
    if (!user) {
      throw new Error("User not found.");
    }

    user.jwtTokenVersion += 1;
    await user.save();

    return { message: "User logged out successfully." };
  }

  async getUserByID(userID) {
    const user = await this.findById(userID);
    if (!user) {
      throw new Error("User not found.");
    }

    return {
      message: "Success",
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  }

  async getAllUsers() {
    const users = await this.findAll();
    if (users.length === 0) {
      return { message: "No users found.", data: [] };
    }

    const safeUsers = users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    }));

    return { message: "Success", data: safeUsers };
  }
}

module.exports = new UserService();
