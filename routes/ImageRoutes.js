const express = require("express");
const app = express();
const router = express.Router();
const imageSchema = require("../models/ImageUpload");
const path = require("path");
const fs = require("fs");
const { log } = require("console");
const cloudinary = require("cloudinary").v2;
router.get("/getItems", async (req, res) => {
  let response = await imageSchema.find({});
  if (!response) return res.send("No items found");
  res.status(201).json({ success: true, data: response });
});

router.post("/uploadImg", async (req, res) => {
  const imgData = req.files.imagesrc;
  if (!imgData.mimetype.startsWith("image")) {
    return res.send("Error in the type of file");
  }
  if (imgData.size > 1024 * 1024) {
    return res.send("Image size is less than 1mb");
  }
  //   const image = imageSchema.create({
  //     name: imgData.name,
  //     imagesrc: path.basename(imgData),
  //   })
  const imgPath = path.join(__dirname, `../uploads/` + `${imgData.name}`);
  await imgData.mv(imgPath);
  let imageObj = await imageSchema.create({
    name: req.files.imagesrc.name,
    imagesrc: req.files.imagesrc.tempFilePath,
  });
  imageObj.save((err)=>{
    if(err) console.log("Error in creating image ");
  })
  res.json({ success: true, url: imgData });
});

router.post("/cloudinaryUpload", async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.imagesrc.tempFilePath,
    {
      folder: "images",
    }
  );
  console.log(result);
  fs.unlinkSync(req.files.imagesrc.tempFilePath);
  let imageObj = await imageSchema.create({
    name: req.files.imagesrc.name,
    imagesrc: result.secure_url,
  });
  imageObj.save();
  return res.status(201).json({ src: result.secure_url });
});

module.exports = router;
