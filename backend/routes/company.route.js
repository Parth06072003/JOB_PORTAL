import express from "express";
import isAuthenticated from "../Middlewares/isAuthenticated.js";
import { getCompany, getCompanyById, registerComapny, updateCompany } from "../controllers/company.controller.js";

const router = express.Router();

router.route("/register").post(isAuthenticated,registerComapny);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
router.route("/update/:id").put(updateCompany);

export default router;