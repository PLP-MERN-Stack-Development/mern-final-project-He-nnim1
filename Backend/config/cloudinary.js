const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require('dotenv').config();

cloudinary.config({
  cloud_name: 'dsychu82j',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Storage settings
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "limamarket/products",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

// Multer middleware
const upload = multer({ storage });

module.exports = { cloudinary, upload };
