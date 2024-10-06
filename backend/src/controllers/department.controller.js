import Department from "../models/department.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createDepartment = asyncHandler(async (req, res) => {

    const isAdmin = req.employee?.isAdmin;
    if (!isAdmin) {
        throw new ApiError(401, "Only manager can create department");
    }

    const { departmentName } = req.body;

    if (!departmentName) {
        throw new ApiError(400, "Department name is required");
    }

    const department = await Department.create({ departmentName })

    if (!department) {
        throw new ApiError(401, "Error while creating department")
    }

    return res.status(200).json(new ApiResponse(200, department, "Department created Successfully"))

})

const addEmployeesInDepartment = asyncHandler(async (req, res) => {
    const isAdmin = req.employee?.isAdmin;
    if (!isAdmin) {
        throw new ApiError(401, "Only manager can create department");
    }

    const { employeeId, departmentId } = req.params;
    if (!employeeId && !departmentId) {
        throw new ApiError(400, "Employee id or Department id is missing")
    }

    const department = await Department.findById(departmentId);
    if (!department) {
        throw new ApiError(404, "Department not found")
    }

    if (!department.employees.includes(employeeId)) {
        department.employees.push(employeeId)
        await department.save();
    }

    return res.status(200).json(new ApiResponse(200, department, "Employee added successfully"));

})

const getAllDepartment = asyncHandler(async (req, res) => {
    const isAdmin = req.employee?.isAdmin;
    if (!isAdmin) {
        throw new ApiError(401, "Only manager can create department");
    }

    const departments = await Department.find().populate("employees");

    if (!departments) {
        throw new ApiError(404, "Demartments not found")
    }

    return res.status(200).json(new ApiResponse(200, departments, "Departments fetched successfully"))
})

const updateDepartment = asyncHandler(async (req, res) => {
    const isAdmin = req.employee?.isAdmin;
    if (!isAdmin) {
        throw new ApiError(401, "Only manager can create department");
    }

    const { departmentName } = req.body;
    const { departmentId } = req.params;
    if (!departmentName) {
        throw new ApiError(400, "department name is required")
    }
    if (!departmentId) {
        throw new ApiError(400, "department id is missing")
    }

    const department = await Department.findByIdAndUpdate(
        departmentId,
        {
            $set: { departmentName }
        },
        { new: true }
    )

    if (!department) {
        throw new ApiError(401,"Error while updating department")
    }

    return res.status(200).json(new ApiResponse(200,department,"updated successfully"))
    
})

const deleteDepartment = asyncHandler(async (req, res) => {
    const isAdmin = req.employee?.isAdmin;
    if (!isAdmin) {
        throw new ApiError(401, "Only manager can create department");
    }

    const { departmentId } = req.params;
    
    if (!departmentId) {
        throw new ApiError(400, "department id is missing")
    }

    const department = await Department.findByIdAndDelete(departmentId)

    if (!department) {
        throw new ApiError(401,"Error while deleting department")
    }

    return res.status(200).json(new ApiResponse(200,department,"deleted successfully"))
    
})



export { createDepartment, addEmployeesInDepartment, getAllDepartment, updateDepartment, deleteDepartment }