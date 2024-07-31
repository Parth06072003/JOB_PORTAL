/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const {loading} = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
    console.log(loading);
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={SubmitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>
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
            <Label className="font-bold">Password</Label>
            <Input
              type="password"
              placeholder="Enter Your Password"
              value={input.password}
              name="password"
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
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-bold">
              Sign Up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
