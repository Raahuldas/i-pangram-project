import JWT from "jsonwebtoken"
import asyncHandler from "../utils/asyncHandler.js"
import Employee from "../models/employee.model.js";
import { ApiError } from "../utils/ApiError.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");

        if(!token){
            throw new ApiError(400,"unauthorized request")
        }

        const decoded = JWT.verify(token,process.env.ACCESS_TOKEN_SECRET);

        const employee = await Employee.findById(decoded?._id)

        if (!employee) {
            throw new ApiError(400,"employee does not exist")
        }
        req.employee =employee;
        next();

    } catch (error) {
        throw new ApiError(500, error?.message || "Invalid access token")
    }
}
)

export { verifyJWT }