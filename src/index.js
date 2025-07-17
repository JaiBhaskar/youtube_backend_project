// require('dotenv').config({path: './env'});


import dotenv from "dotenv"
import connectDB from "./db/connecting_db.js";


dotenv.config({
    path: './env'
})


// Second Approach
connectDB()

//niche wali lines because connecting_db mein hamare paas ek async-await hai and it alwas returns a promise
.then(()=> {
    app.on("error",(error)=>{
        console.log("The error we have encountered is: ",error);
        throw error;
    })

    app.listen(process.env.PORT || 3000, ()=>{
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MongoDB connection failed !!! ",err);
})







// First Approach to connect Database

// import monngoose from "mongoose";
// import { DB_NAME } from "./constants";
// import connectDB from "./db/index.js";

/*
import express from "express"
const app = express()

( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",() => {
            console.log("ERRR:",error);
            throw error
        })

        app.listen(process.env.PORT, (error) =>{
            console.log(`App is listening on Port ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("Error:", error)
        throw error
    }
})()
*/