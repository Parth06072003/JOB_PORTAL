import {Company} from "../models/company.model.js";

export const registerComapny = async (req,res) =>
{
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }
        let company = await Company.findOne({ companyName: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register same company.",
                success: false
            })
        };
        company = await Company.create({
            companyName: companyName,
            UserId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

//GET ALL COMPANY BY THAT USER
export const getCompany = async (req,res)=>{
    try {
        const userId=req.id;
        const companies=await Company.find({UserId:userId});
        if(!companies)
        {
            return res.status(404).json({
                message:"No Company registerd",
                succuess:false
            });
        }
        return res.status(200).json({
            message:"Company Found Successfully",
            companies,
            succuess:true
        });
    } catch (error) {
        console.log.apply(error);
    }
}
//GET COMAPNY BY ID
export const getCompanyById =async (req,res)=>{
    try {
        const companyId= req.params.id;
        const company=await Company.findById(companyId);
        if(!company)
        {
            return res.status(404).json({
                message:"No Company registerd",
                succuess:false
            });
        }
        return res.status(200).json({
            company,
            succuess:true
        });

    } catch (error) {
        console.log(error);
    }
}

//UPDATE COMPANY 

export const updateCompany = async(req,res)=>{
    try {
        const {companyName,description,website,location}=req.body;
        const file=req.file;

        const updateData ={companyName,description,website,location}

        const company= await Company.findByIdAndUpdate(req.params.id,updateData); 

        if(!company)
        {
            return res.status(404).json({
                message:"No Company registerd",
                succuess:false
            });
        }

        return res.status(200).json({
            message:"Company Update Successfully",
            succuess:true
        });
    } catch (error) {
        console.log(error);
    }
}