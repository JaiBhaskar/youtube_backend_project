// here we are creating a utility function (wrapper banaa rahe hain asyncHandler ke liye)


// 2nd way: promise wala async handler
const asyncHandler = (requestHandler)=> {
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }
}
export {asyncHandler}


// below lines are just para understanding

// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async() => {}





//1st way: try-catch waala asynchronous handler 
    /*
const asyncHandler = (fn) => async(req, res, next) => {
    try {
        await fn(req,res,next)
    } catch (error) {
        res.status(err.code || 500).json({
            success:false,
            message: err.message
        })
    }
}
*/