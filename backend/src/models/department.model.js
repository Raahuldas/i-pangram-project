import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    departmentName: {
        type: String,
        required: [true,"Department name is required"],
        unique: true
    },
    employees:[
        {
            type: mongoose.Schema.ObjectId,
            ref:"Employee"
        }
    ]
})

const Department = mongoose.model("Department",departmentSchema);

export default Department;