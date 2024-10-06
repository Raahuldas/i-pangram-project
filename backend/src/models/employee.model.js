import mongoose from "mongoose";
import bycrpt from "bcrypt"
import jwt from "jsonwebtoken";

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true,"Password is required"]
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    location: {
        type: String,
        required:[true,"Location field is required"]
    }

})

employeeSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bycrpt.hash(this.password, 10)
    next();
})

employeeSchema.methods.isPasswordCorrect = async function (password) {
    return await bycrpt.compare(password, this.password)
}

employeeSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "1d"
        }
    )
}

const Employee = mongoose.model("Employee",employeeSchema)
export default Employee;