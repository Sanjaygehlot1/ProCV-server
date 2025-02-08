import mongoose from "mongoose";

const DBConnect = async ()=>{
    try {
       const connected = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DATABASE_NAME}`)

       if(connected){
        console.log("DB connection successfull")
       }
    } catch (error) {
        console.log("DB connection failed")
    }
}

export default DBConnect