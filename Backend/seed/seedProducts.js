require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require("mongoose");
const Product = require("../models/Product");
const Farmer = require("../models/farmer");
const { cloudinary } = require("../config/cloudinary");

const MONGODB_URI = process.env.MONGODB_URI;


async function uploadImage(url) {
  const uploaded = await cloudinary.uploader.upload(url, {
    folder: "limamarket/products"
  });
  return uploaded.secure_url;
}

async function seedProducts() {
  try {
    await Product.deleteMany();
    console.log("Old products removed");

    // get any farmer to assign as owner
    const farmer = await Farmer.findOne();
    if (!farmer) {
      console.log("❌ No farmer found. Run farmer seeder first.");
      process.exit();
    }

    const productData = [
      {
        farmer: farmer._id,
        name: "Fresh Tomatoes",
        price: 120,
        quantity: 40,
        category: "Vegetables",
        description: "Organic red tomatoes.",
        imageUrl: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg"
      },
      {
        farmer: farmer._id,
        name: "Red Onions",
        price: 90,
        quantity: 25,
        category: "Vegetables",
        description: "Aromatic red onions.",
        imageUrl:"https://images.pexels.com/photos/33256563/pexels-photo-33256563.jpeg"
      },
      {
        farmer: farmer._id,
        name: "Cabbage",
        price: 60,
        quantity: 30,
        category: "Vegetables",
        description: "Large heads of cabbage.",
        imageUrl: "https://images.pexels.com/photos/2518893/pexels-photo-2518893.jpeg"
      },
      {
        farmer: farmer._id, 
        name: "Potatoes",
        price: 150,
        quantity: 60,
        category: "Vegetables",
        description: "Fresh Irish potatoes.",
        imageUrl: "https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg"
      },
      {
        farmer: farmer._id,
        name: "Mangoes",
        price: 150,
        quantity: 60,
        category: "Fruits",
        description: "Fresh and juicy mangoes.",
        imageUrl: "https://images.pexels.com/photos/918643/pexels-photo-918643.jpeg"
      },
      {
        farmer: farmer._id,
        name: "Bananas",
        price: 80,
        quantity: 100,  
        category: "Fruits",
        description: "Ripe yellow bananas.",
        imageUrl: "https://images.pexels.com/photos/2316466/pexels-photo-2316466.jpeg"
      },
      {
        farmer: farmer._id,
        name: "Maize",
        price: 70,
        quantity: 200,
        category: "Cereals",
        description: "Dried maize grains.",
        imageUrl: "https://images.pexels.com/photos/2875698/pexels-photo-2875698.jpeg"  
      },
      {
        farmer: farmer._id,
        name: "Eggs",
        price: 300,
        quantity: 150,
        category: "Animal Products",
        description: "Farm fresh eggs.",
        imageUrl: "https://images.pexels.com/photos/600615/pexels-photo-600615.jpeg"
      }
    ];

    const seededProducts = [];

    // Loop through the productData array (8 items)
    for (const product of productData) { 
        
        // 1. Get the URL from the current product object
        const originalUrl = product.imageUrl.trim(); // Trim spaces just in case!

        // 2. Upload the image to Cloudinary
        // Note: I'm wrapping this in a try/catch in case ONE image URL is bad
        let uploadedUrl;
        try {
            uploadedUrl = await uploadImage(originalUrl);
        } catch (uploadError) {
            console.error(`⚠️ Failed to upload image for ${product.name}: ${uploadError.message}`);
            // Use the original URL as a fallback if the upload fails
            uploadedUrl = originalUrl; 
        }

        // 3. Create the product document with the uploaded (or original) URL
        const createdProduct = await Product.create({
            ...product,
            farmer: farmer._id,
            imageUrl: uploadedUrl // Use the URL returned by Cloudinary (or the fallback)
        });

        seededProducts.push(createdProduct);
    }

    console.log("🌱 Products seeded:", seededProducts);
    process.exit();

  } catch (err) {
    console.log(err);
    process.exit();
  }
}

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected. Starting seed operation...");
    seedProducts(); 
  })
  .catch(err => {
    console.error("\n❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });