import cookieParser from "cookie-parser"
import express from "express" 
import cors from "cors"

const app = express()

app.use(cors(
    {
        origin:["http://localhost:5173",process.env.CORS_ORIGIN], 
        credentials:true,
    }
))

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(express.static("public"))
app.use(cookieParser())

import employeeRouter from "./routes/employee.route.js";
import departmentRouter from "./routes/department.route.js"
app.use("/api/employees",employeeRouter);
app.use("/api/department",departmentRouter);

export default app;