// In seedFarmers.js
require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Farmer = require("../models/farmer");
const User = require('../models/user');


const MONGODB_URI = process.env.MONGODB_URI;

const farmerUsersData = [
      {
        name: "John Mwangi",
        email: "johnmwangi@example.com",
        password: "password123",
        phone: "0712345678",
        role: "farmer",
        profile:{
            farmName: "Mwangi's Fresh Produce", 
            farmLocation: "Nakuru, Farm 1A", 
            farmSize: "10 acres", 
            farmType: "Vegetables",
            bio: "We specialize in organic vegetables.",
            profileImageUrl: "https://images.pexels.com/photos/2382665/pexels-photo-2382665.jpeg"
        }   
      },
      {
        name: "Grace Wambui",
        email: "gracewambui@example.com",
        password: "password123", 
        phone: "0798765432",
        role: "farmer",
        profile:{
            farmName: "Wambui's Green Farm", 
            farmLocation: "Eldoret, Farm 3B",
            farmSize: "15 acres", 
            farmType: "Fruits",
            bio: "Fresh fruits straight from our farm to your table.",
            profileImageUrl: "https://images.pexels.com/photos/209339/pexels-photo-209339.jpeg"
        }
      },
      {
        name: "Liam Kimani",
        email: "liamkimani@example.com",
        password: "password123",
        phone: "0798234567",
        role: "farmer",
        profile:{
            farmName: "Kimani's Cereal Fields", 
            farmLocation: "Nakuru, Farm 5C",
            farmSize: "20 acres", 
            farmType: "Cereals",
            bio: "High-quality cereals for all your needs.",
            profileImageUrl: "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg"
        } 
      },
      {
        name: "Joyce Achieng",
        email: "joyceachieng@example.com",
        password: "password123",
        phone: "0785345621",
        role: "farmer",
        profile: {
            farmName: "Achieng's Livestock Ranch", 
            farmLocation: "Kisumu, Ranch 2D",
            farmSize: "25 acres", 
            farmType: "Animal Products",
            bio: "Premium livestock and animal products.",
            profileImageUrl: "https://images.pexels.com/photos/3152331/pexels-photo-3152331.jpeg"
        }
        
      },
      {
        name: "Brian Kemboi",
        email: "briankemboi@example.com",
        password: "password123", 
        phone: "0734567890",
        role: "farmer",
        profile:{
            farmName: "Kemboi's Fruitty Farm", 
            farmLocation: "Kericho, Farm 4E",
            farmSize: "30 acres",   
            farmType: "Fruits",
            bio: "Delicious and fresh fruits grown with care.",
            profileImageUrl: "https://images.pexels.com/photos/1268100/pexels-photo-1268100.jpeg"
        }
      },
      {
        name: "Philip Wanjala",
        email: "philipwanjala@example.com",
        password: "password123",
        phone: "0712984756",
        role: "farmer",
        profile: {
            farmName: "Wanjala's Veggie Patch", 
            farmLocation: "Kitale, Patch 6F",
            farmSize: "12 acres",
            farmType: "Vegetables",
            bio: "Your go-to place for fresh vegetables.",
            profileImageUrl: "https://images.pexels.com/photos/1691180/pexels-photo-1691180.jpeg"
        }  
      },
      {
        name: "Linus Kamau",
        email: "linuskamau@example.com",
        password: "password123",
        phone: "0734298764",
        role: "farmer",
        profile: {
            farmName: "Kamau's Cereals Farm",
            farmLocation: "Kiambu, Farm 7G",
            farmSize: "18 acres",
            farmType: "Cereals",
            bio: "Top-quality cereals for healthy living.",
            profileImageUrl: "https://images.pexels.com/photos/2131661/pexels-photo-2131661.jpeg"
        }
      },
      {
        name: "George Saitoti",
        email: "georgesaitoti@example.com",
        password: "password123",
        phone: "0734512738",
        role: "farmer",
        profile: {
            farmName: "Saitoti's Livestock Haven", 
            farmLocation: "Kajiado, Haven 8H",
            farmSize: "22 acres",
            farmType: "Animal Products",
            bio: "Healthy and well-raised livestock.",
            profileImageUrl: "https://images.pexels.com/photos/4911744/pexels-photo-4911744.jpeg"
        }
      }
    ];

async function seedFarmers() {
    try {
        // 1. Clear existing data
        await Farmer.deleteMany();
        // Assuming Farmer is linked to User, we should clear Users too
        await User.deleteMany({ role: 'farmer' }); 
        console.log("Old farmer profiles and user accounts removed");

        const seededFarmers = [];
        
        // 2. Loop through the combined data and create documents sequentially
        for (const farmerData of farmerUsersData) {
            
            // Hash the password
            const hashedPassword = await bcrypt.hash(farmerData.password, 10);
            
            // A. Create the User Account
            const newUser = await User.create({
                name: farmerData.name,
                email: farmerData.email,
                password: hashedPassword,
                role: farmerData.role,
                phone: farmerData.phone // assuming User model has a phone field
            });

            // B. Create the linked Farmer Profile using the User ID
            const newFarmer = await Farmer.create({
                // Set the required 'user' field with the new User's ID
                user: newUser._id, 
                // Copy all profile data
                ...farmerData.profile 
            });

            seededFarmers.push(newFarmer);
        }

        console.log(`🌱 Farmers seeded: ${seededFarmers.length} profiles created.`);
        process.exit();

    } catch (err) {
        console.error("❌ Error seeding farmers:", err);
        process.exit(1);
    }
}
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected. Starting seed operation...");
    seedFarmers();
  })
  .catch(err => {
    console.error("\n❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
