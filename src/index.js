import DBConnect from "./DataBase/DBConnection.js";
import dotenv from 'dotenv'
import { app } from "./app.js";
dotenv.config({
    path: ".env"
})

DBConnect()
.then(()=>{
    app.listen(process.env.PORT || 3000 ,()=>{
        console.log("app listening at port:", process.env.PORT)
    }) 
})
.catch((err)=>{
    console.log("Error Connecting to Database ", err)
})