import DBConnect from "./DataBase/DBConnection.js";
import dotenv from 'dotenv'
import { app } from "./app.js";
import serverless from 'serverless-http'; 

dotenv.config({
    path: ".env"
})

DBConnect().catch((err)=>{
    console.log("Error Connecting to Database ", err)
})

export default serverless(app);