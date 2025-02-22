import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../Middlewares/isAuthenticated.js";
import { singleUpload } from "../Middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/profile/update").post(isAuthenticated,updateProfile);
router.route("/logout").get(logout);

export default router;