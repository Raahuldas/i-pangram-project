import { Router } from "express";
import { deleteEmployee, getAllEmployees, login, registerEmployee, updateEmployee } from "../controllers/employee.controller.js";
import { verifyJWT } from "../middlewares/auth.js";

const router = Router();

router.route('/register').post(registerEmployee);
router.route('/login').post(login);
router.route('/all-emp').get(getAllEmployees);
router.route('/delete-emp/:employeeId').delete(verifyJWT, deleteEmployee);
router.route('/update-emp/:employeeId').post(verifyJWT, updateEmployee);

export default router;