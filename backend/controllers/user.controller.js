import { response } from "express";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return response.status(400).json({
        message: "Something Is Missing",
        success: "false",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email Already Exist",
        success: "false",
      });
    }
    const hashedpassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        fullname,
        email,
        phoneNumber,
        password: hashedpassword,
        role,
      });
  
      await newUser.save();

    return res.status(201).json({
      message: "Account Created",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something Is Missing",
        success: "false",
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User Not found",
        success: "false",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(404).json({
        message: "password wrong",
        success: "false",
      });
    }
    if (role != user.role) {
      return res.status(404).json({
        message: "Account Does Not Exist",
        success: "false",
      });
    }

    const tokenData = {
      userID: user._id,
    };

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    const token = await jwt.sign(tokenData, process.env.SECERT_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome Back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
    try {
      return res
        .status(200)
        .cookie("token","", {
          maxAge:0,
        })
        .json({
          message: `Logout Successfully`,
          success: true,
        });
    } catch (error) {
      console.log(error);
    }
};

export const updateProfile = async (req,res) =>{
    try{
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file=req.file;
        let skillsArray;
        if(skills) { skillsArray= skills.split(","); }
        const userId=req.id; // Middleware
        let user= await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message: "User Is Missing",
              success: "false", 
            });
        }
        if(fullname)user.fullname=fullname
        if(email)user.email=email
        if(phoneNumber)user.phoneNumber=phoneNumber
        if(bio)user.profile.bio=bio
        if(skills)user.profile.skill=skillsArray

        //RESUME    

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
          };

          return res.status(200).json({
            message:"Profile Updated Successfully",
            user,
            status:true
          });
    }
    catch (error) {
        console.log(error);
    }
};