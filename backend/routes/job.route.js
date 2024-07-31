import express from "express";
import isAuthenticated from "../Middlewares/isAuthenticated.js";
import { getAdminJob, getAllJob, getJobbyId, postJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/postjob").post(isAuthenticated,postJob);
router.route("/get").get(isAuthenticated,getAllJob);
router.route("/getadminjob").get(isAuthenticated,getAdminJob);
router.route("/getJobById/:id").get(isAuthenticated,getJobbyId);

export default router;