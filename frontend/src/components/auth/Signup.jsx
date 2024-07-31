/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "",
    file: "",
  });

  const navigate =useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const {loading}=useSelector(store=>store.auth)
  const SubmitHandler = async (e) => {
      e.preventDefault();
    // if(input.password!=input.confirmPassword)
    // {
    //    console.log("Password must be same ");
    // }
    const dispatch=useDispatch();
    const formData =new FormData();
    formData.append("fullname",input.fullname);
    formData.append("email",input.email);
    formData.append("phoneNumber",input.phoneNumber);
    formData.append("password",input.password);
    formData.append("role",input.role);
    if(input.file)
        {
            formData.append("file",input.file);
        }
        try {
          dispatch(setLoading(true));
        const res =await axios.post(`${USER_API_END_POINT}/register`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        });
        console.log(res);
        if(res.data.success)
        {
            navigate("/login");
            toast.success(res.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }finally
    {
      dispatch(setLoading(false));
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={SubmitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label className="font-bold">Full Name</Label>
            <Input
              type="text"
              placeholder="Enter Your Full Name"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
            ></Input>
          </div>
          <div className="my-2">
            <Label className="font-bold">Email</Label>
            <Input
              type="email"
              placeholder="Enter Your Email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
            ></Input>
          </div>
          <div className="my-2">
            <Label className="font-bold">Phone Number</Label>
            <Input
              type="number"
              placeholder="Enter Your Phone Number"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
            ></Input>
          </div>
          <div className="my-2">
            <Label className="font-bold">Password</Label>
            <Input
              type="password"
              placeholder="Enter Your Password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
            ></Input>
          </div>
          <div className="my-2">
            <Label className="font-bold">Confirm Password</Label>
            <Input
              type="password"
              placeholder="Enter Your Password Again"
              value={input.confirmPassword}
              name="confirmPassword"
              onChange={changeEventHandler}
            ></Input>
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center  gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Student"
                  className="cursor-pointer"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
                />
                <Label className="font-bold">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Recuiter"
                  className="cursor-pointer"
                  checked={input.role === "Recuiter"}
                  onChange={changeEventHandler}
                />
                <Label className="font-bold">Recuiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label className="font-bold">Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>
          {
            loading ? 
            <Button className="w-full my-4 bg-[#6A38C2] hover:bg-[#5b30a6]">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
           : 
            <Button
              type="submit"
              className="w-full my-4 bg-[#6A38C2] hover:bg-[#5b30a6]"
            >
              Login
            </Button>
          }

          <span>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-bold">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
