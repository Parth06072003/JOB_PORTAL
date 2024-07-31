import {Job} from "../models/job.model.js";
// admin
export const postJob = async (req,res)=>{
    try {
        const {title,description,requirements,salary,location,jobType,experience,position,companyId}=req.body;
        const userId=req.id;
        if(!title||!description||!requirements||!salary||!location||!jobType||!experience||!position||!companyId)
        {
            return res.status(400).json({
                message: "Something  is missing.",
                success: false
            });
        }
        const job =await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experiencelevel: experience,
            position,
            company: companyId,
            createdBy: userId
        });
        return res.status(201).json({
            message: "New Job Created Successfully",
            job,
            success: true,
          });
    } catch (error) {
        console.log(error);
    }
}


export const getAllJob = async(req,res)=>
    {
        try {
            const keyword=req.query.keyword || "";
            const query={
                $or:[
                    {title:{$regex:keyword,$options:"i"}},
                    {description:{$regex:keyword,$options:"i"}},
                ]
            };
            const jobs =await Job.find(query).populate({
                path:"company"
            }).sort({createdAt:-1});
            if(!jobs)
            {
                return res.status(401).json({
                    message: "Jobs not found.",
                    success: false
                }); 
            }
            return res.status(201).json({
                jobs,
                success: true,
              });
        } catch (error) {
            console.log(error);
        }
    }

export const getJobbyId = async(req,res)=>
{
    try {
        const jobId=req.params.id;
        const job = await Job.findById(jobId);
        if(!job)
        {
            return res.status(401).json({
                message: "Job not found.",
                success: false
            });
        }
        return res.status(201).json({
            job,
            success: true,
          });
    } catch (error) {
        console.log(error);
    }
}


export const getAdminJob=async(req,res)=>{
    try {
        const adminId=req.id;
        console.log(adminId);
        const jobs= await Job.find({createdBy:adminId});
        if(!jobs)
        {
            return res.status(401).json({
                message: "Jobs not found.",
                success: false
            });
        }
        return res.status(201).json({
            jobs,
            success: true,
          });
    
    } catch (error) {
        console.log(error);
    }
}