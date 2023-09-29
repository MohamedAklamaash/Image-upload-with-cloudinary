const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const db= require("./mongoConnection")();
const imgUploadFunc = require("./routes/ImageRoutes");
const cloudinary = require("cloudinary").v2;

app.use(express.json());
app.use(fileUpload({useTempFiles:false}));
app.use("/",imgUploadFunc);
cloudinary.config({
  cloud_name: "duhkiwuqq",
  api_key: "669137483795347",
  api_secret: "OAEvqxQ-148eWAsQBI6e0lLIv4A",
});
app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})