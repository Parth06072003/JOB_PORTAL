import { populate } from "dotenv";
import { Application } from "../models/Application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(404).json({
        message: "Job Not Found",
        succuess: false,
      });
    }
    //CHECKING USER HAS APPLIED OR NOT
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for the Job",
        succuess: false,
      });
    }
    //check if job exist
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job Not Found",
        succuess: false,
      });
    }
    //create a new application
    const newApllication =await Application.create({
        job:jobId,
        applicant:userId
    });

    job.applications.push(newApllication);
    await job.save();

    return res.status(200).json({
        message: "Job Applied Successfully",
        succuess: true
      });
  } catch (error) {
    console.log(error);
  }
};

export const getAppliedJobs = async (req,res)=>{
    try {
        const userId=req.id;
        const application=await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }  
        });
        if (!application)
        {
            return res.status(404).json({
                message: "Application Not Found",
                succuess: false,
              }); 
        }
        return res.status(200).json({
            message: "Applications  Found",
            application,
            succuess: true,
          }); 
    } catch (error) {
        console.log(error);
    }
}

export const getApplicants =async(req,res)=>{
    try {
        const jobId=req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"applicant"
            }
        });
        if(!job){
            return res.status(404).json({
                message: "Job Not Found",
                succuess: false,
              }); 
        }

        return res.status(200).json({
            message: "Job  Found",
            job,
            succuess: true,
          });

    } catch (error) {
        console.log(error);
    }
}

export const updateStatus= async (req,res)=>
{
    try {
        const {status}=req.body;
        const applicationId= req.params.id;
        if(!status)
        {
            return res.status(400).json({
                message: "Status is Requierd",
                succuess: false,
              }); 
        }

        const application= await Application.findOne({_id:applicationId});
        console.log(applicationId);
        console.log(application);
        if(!application)
            {
                return res.status(404).json({
                    message: "Application Not found",
                    succuess: false,
                  }); 
            }

        application.status=status.toLowerCase();
        await application.save();

        
                return res.status(200).json({
                    message: "Status Updated",
                    succuess: true,
                  }); 
    } catch (error) {
        console.log(error);
    }
}
