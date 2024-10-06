import Employee from "../models/employee.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const options = {
    httpOnly: true,
    secure: true
}

const registerEmployee = asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin = false, location } = req.body;

    if ([name, email, password, location].some(item => item.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const existedEmployee = await Employee.findOne({
        email
    })

    if (existedEmployee) {
        throw new ApiError(401, "Employee already exist with this email")
    }

    const employee = await Employee.create({
        name,
        email,
        password,
        isAdmin,
        location
    })

    if (!employee) {
        throw new ApiError(401, "Error while registering employee")
    }

    return res.status(200).json(new ApiResponse(200, employee, "Employee registered successfully"))

})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email && !password) {
        throw new ApiError(400, "All fields are required")
    }

    const employee = await Employee.findOne({ email });

    if (!employee) {
        throw new ApiError(400, "Employee not found")
    }

    const isPasswordValid = await employee.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(400, "invalid password")
    }

    const accessToken = await employee.generateAccessToken();

    const loggedInEmployee = await Employee.findById(employee?.id).select("-password");

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(new ApiResponse(200, loggedInEmployee, "Employee logged in"))
})

const getAllEmployees = asyncHandler(async (req, res) => {

    const { sortBy = "name", sortType = "asc" } = req.query;

    let sortCriteria = {}

    if (sortBy && sortType) {
        sortCriteria[sortBy] = sortType === "desc" ? -1 : 1;
    }

    const employees = await Employee
        .find({})
        .sort(sortCriteria)

    if (!employees) {
        throw new ApiError(404, "employees not found")
    }

    return res.status(200).json(new ApiResponse(200, employees, "Employees fetched"))
})

const deleteEmployee = asyncHandler(async (req, res) => {

    const isAdmin = req.employee?.isAdmin;
    if (!isAdmin) {
        throw new ApiError(400, "Only Manager can delete")
    }

    const { employeeId } = req.params;

    if (!employeeId) {
        throw new ApiError(400, "Employee id is missing")
    }

    const deletedEmployee = await Employee.findOneAndDelete(employeeId);

    if (!deletedEmployee) {
        throw new ApiError(401, "Error while deleting employee")
    }

    return res.status(200).json(new ApiResponse(200, deletedEmployee, "Employee deleted successfully"))
})

const updateEmployee = asyncHandler(async (req, res) => {

    const isAdmin = req.employee?.isAdmin;
    if (!isAdmin) {
        throw new ApiError(400, "Only Manager can Update")
    }

    const { employeeId } = req.params;
    const { name, email,location } = req.body;

    if (!employeeId) {
        throw new ApiError(400, "Employee id is missing")
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
        employeeId,
        {
            $set: {
                name,
                email,
                location
            }
        },
        {new : true}
    )


    return res.status(200).json(new ApiResponse(200, updatedEmployee, "Employee deleted successfully"))
})


export { registerEmployee, login, getAllEmployees, deleteEmployee,updateEmployee }