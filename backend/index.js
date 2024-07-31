import cookieParser from "cookie-parser";
import cors from "cors";
import express, { urlencoded } from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import CompanyRoute from "./routes/company.route.js";
import JobRoute from "./routes/job.route.js";
import ApplyRoute from "./routes/applications.route.js";

dotenv.config({});

const app= express();


//middleware

app.use(express.json());//to pass the data in json format 
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions={
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsOptions))
const PORT= process.env.PORT || 3030;

//API
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",CompanyRoute);
app.use("/api/v1/job",JobRoute);
app.use("/api/v1/apply",ApplyRoute);




app.listen(PORT,()=>{
    connectDB(); 
    console.log(`Server Running at Port ${PORT}`);
});