/* eslint-disable no-unused-vars */

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOutIcon, User2 } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = true;
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold cursor-pointer">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div>
          <ul className="flex text-xl item-center gap-4 ">
            <Link to='/' className="cursor-pointer">Home</Link>
            <Link to='/jobs' className="cursor-pointer">Jobs</Link>
            <Link to='/browse' className="cursor-pointer">Browse</Link>
          </ul>
        </div>
        {!user ? (
          <div className="flex gap-2 items-center">
          <Link to='/login'>
            <Button variant='outline'>Login</Button>
          </Link>
          <Link to='/Signup'>
            <Button className='bg-[#6A38C2] hover:bg-[#5b30a6]'>Signup</Button>
          </Link>
          </div>
        ) : (
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex items-center gap-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Parth Hitesh Patel</h4>
                    <p className="text-sm text-muted-foreground">
                      My name is Parth patel
                    </p>
                  </div>
                </div>
                <div className="flex flex-col text-gray-600 my-2">
                  <div className="flex items-center">
                    <User2 />
                    <Button variant="link">View Profile</Button>
                  </div>
                  <div className="flex items-center">
                    <LogOutIcon />
                    <Button variant="link">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
