import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req,res) =>{
    // first step: Check if user is already having an account
    // second: Create a username and check its different from all others 
    // third: Create a password that is strong and has not been breached
    // fourth: sign in user also other details can be taken from the user while signing in eg. DOB, phone number verification, etc.


    // get user details from frontend
    // validation - not empty, email matches certain criterion
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar is uploaded successfully ensure that also
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response if nahi huaa hai toh error bhejdo

    const {fullName, email, username, password} = req.body
    console.log("email: ", email);
    
    // Yaa toh esa simple if-else use karle yaa fir niche wala advance if else using some method use karle
    // if(fullName === ""){
    //     throw new ApiError(400, "fullname is required")
    // }

    // Advance if-else using some method industry level approach
    if([fullName,email,username, password].some((field)=>
    field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    const existeduser=User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar=await uploadOnCloudinary(avatarLocalPath)
    const coverImage=uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )
})


export {registerUser}