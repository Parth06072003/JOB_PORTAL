import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['Student','Recuiter'],
        required:true
    },
    profile:{
        bio:{type:String},
        skill:[{type:String}],
        resume:{type:String},//Providing the URL to Resume
        resumeOrginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'},
        profilePhoto:{type:String,default:""},
    }
},{timestamps:true});

export const User =mongoose.model('User',userSchema);
