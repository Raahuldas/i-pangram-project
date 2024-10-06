import { configDotenv } from "dotenv";
import app from "./app.js";
import ConnectDB from "./dbConnect/index.js";

configDotenv({
    path: "./.env"
})

ConnectDB().then(()=>{ 
        app.listen( process.env.PORT || 8000,()=>{
            console.log("Server is running on port", process.env.PORT);
        })}
) .catch(error => { console.log("Mongodb connection failed !!", error) })