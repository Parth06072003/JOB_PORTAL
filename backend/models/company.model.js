import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const CompanySchema= new mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    website:{
        type:String
    },
    Location:{
        type:String
    },
    logo:{
        type:String,
    },
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true   
    },
},{timestamps:true});

export const Company=mongoose.model("Company",CompanySchema); 