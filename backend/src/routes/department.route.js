import { Router } from "express";
import { addEmployeesInDepartment, createDepartment, deleteDepartment, getAllDepartment, updateDepartment } from "../controllers/department.controller.js";
import { verifyJWT } from "../middlewares/auth.js";

const router = Router();

router.route("/create").post(verifyJWT,createDepartment)
router.route("/add-emp/:departmentId/:employeeId").post(verifyJWT,addEmployeesInDepartment)
router.route("/all-dept").get(verifyJWT,getAllDepartment)
router.route("/update-dept/:departmentId").post(verifyJWT,updateDepartment);
router.route("/delete-dept/:departmentId").delete(verifyJWT,deleteDepartment); 

export default router;