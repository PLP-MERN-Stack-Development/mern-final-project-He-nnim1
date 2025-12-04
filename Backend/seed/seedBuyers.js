require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Buyer = require("../models/Buyer");
const User = require('../models/user');

const MONGODB_URI = process.env.MONGODB_URI;

const buyerUsersData = [
     {
        name: "Leonard Koskei",
        email: "leonardkoskei@example.com",
        password: "password123",
        role: "buyer",
        profile:{
            name: "Leonard Koskei",
            preferredProduct: "Cereals",
            phone: "0789765432",
            address: "Eldoret",
        }
     },
     {
        name: "Abby Njeri",
        email: "abbynjeri@example.com",
        password: "password123",
        role: "buyer",
        profile:{
            name: "Abby Njeri",
            preferredProduct: "Vegetables",
            phone: "0798756432",
            address: "Kajiado",
        }
     },
     {
        name: "Susan Wambui",
        email: "susanwambui@example.com",
        password: "password123",
        role: "buyer",
        profile:{
            name: "Susan Wambui",
            preferredProduct: "Fruits",
            phone: "0798765342",
            address: "Kericho",
        }
      },
      {
        name: "Lydia Makasi",
        email: "lydiamakasi@example.com",
        password: "password123",
        role: "buyer",
        profile:{
            name: "Lydia Makasi",
            preferredProduct: "Vegetables",
            phone: "0798675432",
            address: "Nakuru",
        }
      },
      {
        name: "Eric Mutua",
        email: "ericmutua@example.com",
        password: "password123",
        role: "buyer",
        profile:{ 
            name: "Eric Mutua",  
            preferredProduct: "Animal Products",
            phone: "0778965432",
            address: "Nairobi",
        }
      },
      {
        name: "Kelvin Otieno",
        email: "kelvin@example.com",
        password: "password123",
        role: "buyer",
        profile:{
            name: "Kelvin Otieno",
            preferredProduct: "Fruits",
            phone: "0712345678",
            address: "Mombasa",
        }
      },
      {
        name: "Sharon Achieng",
        email: "sharon@example.com",
        password: "password123",
        role: "buyer",
        profile:{
            name: "Sharon Achieng",
            preferredProduct: "Vegetables",
            phone: "0723456789",
            address: "Kisumu",
        }
      },
      {
        name: "Muli Lillian",
        email: "mulill@example.com",
        password: "password123",
        role: "buyer",
        profile:{
            name: "Muli Lillian",
            preferredProduct: "Cereals",
            phone: "0734567890",
            address: "Nakuru",
        }
      }
];

async function seedBuyers() {
    try {
        // 1. Clear existing data
        await Buyer.deleteMany();
        await User.deleteMany({ role: 'buyer' }); // Clear linked user accounts
        console.log("Old buyers and user accounts removed");

        const seededBuyers = [];
        
        // 2. Loop and create documents sequentially
        for (const buyerData of buyerUsersData) {
            
            // Hash the password
            const hashedPassword = await bcrypt.hash(buyerData.password, 10);
            
            // A. Create the User Account
            const newUser = await User.create({
                name: buyerData.name,
                email: buyerData.email,
                password: hashedPassword,
                role: buyerData.role,
                phone: buyerData.phone // Assuming User model has phone field
            });

            // B. Create the linked Buyer Profile using the User ID
            const newBuyer = await Buyer.create({
                user: newUser._id, 
                name: buyerData.name,
                email: buyerData.email,
                phone: buyerData.phone,
                address: buyerData.address,
                preferredProduct: buyerData.preferredProduct
                // ... other buyer-specific fields
            });

            seededBuyers.push(newBuyer);
        }

        console.log(`🌱 Buyers seeded: ${seededBuyers.length} profiles created.`);
        process.exit();

    } catch (err) {
        console.error("❌ Error seeding buyers:", err);
        process.exit(1);
    }
}

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected. Starting seed operation...");
    seedBuyers(); 
  })
  .catch(err => {
    console.error("\n❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
