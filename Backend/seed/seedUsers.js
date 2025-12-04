// In seedFarmers.js
require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require('../models/user');

const Farmer = require("../models/farmer");
const Buyer = require("../models/Buyer");

const MONGODB_URI = process.env.MONGODB_URI;

const users = [
      {
        name: "John Mwangi",
        email: "johnmwangi@example.com",
        password: "password123",
        phone: "0712345678",
        role: "farmer",
        farmName: "Mwangi's Fresh Produce",
        farmLocation: "Nakuru, Farm 1A"
      },
      {
        name: "Grace Wambui",
        email: "gracewambui@example.com",
        password: "password123", 
        phone: "0798765432",
        role: "farmer",
        farmName: "Wambui's Green Farm",
        farmLocation: "Eldoret, Farm 3B"
      },
      {
        name: "Liam Kimani",
        email: "liamkimani@example.com",
        password: "password123",
        phone: "0798234567",
        role: "farmer",
        farmName: "Kimani's Cereal Fields",
        farmLocation: "Nakuru, Farm 5C"
      },
      {
        name: "Joyce Achieng",
        email: "joyceachieng@example.com",
        password: "password123",
        phone: "0785345621",
        role: "farmer",
        farmName: "Achieng's Livestock Ranch",
        farmLocation: "Kisumu, Ranch 2D"
      },
      {
        name: "Brian Kemboi",
        email: "briankemboi@example.com",
        password: "password123", 
        phone: "0734567890",
        role: "farmer",
        farmName: "Kemboi's Fruitty Farm",
        farmLocation: "Kericho, Farm 4E"
      },
      {
        name: "Philip Wanjala",
        email: "philipwanjala@example.com",
        password: "password123",
        phone: "0712984756",
        role: "farmer",
        farmName: "Wanjala's Veggie Patch",
        farmLocation: "Kitale, Farm 6F"
      },
      {
        name: "Linus Kamau",
        email: "linuskamau@example.com",
        password: "password123",
        phone: "0734298764",
        role: "farmer",
        farmName: "Kamau's Cereals Farm",
        farmLocation: "Kiambu, Farm 7G"
      },
      {
        name: "George Saitoti",
        email: "georgesaitoti@example.com",
        password: "password123",
        phone: "0734512738",
        role: "farmer",
        farmName: "Saitoti's Livestock Haven",
        farmLocation: "Kajiado, Haven 8H"
      },
      {
        name: "Leonard Koskei",
        email: "leonardkoskei@example.com",
        password: "password123", 
        phone: "0789765432",
        address: "Eldoret",
        role: "buyer"
      },
      {
        name: "Abigael Njeri",
        email: "abbynjeri@example.com",
        password: "password123",
        phone: "0798756432",
        address: "Kajiado",
        role: "buyer"
      },
      {
        name: "Susan Wambui",
        email: "susanwambui@example.com",
        password: "password123", 
        phone: "0798765342",
        address: "Kericho",
        role: "buyer"
      },
      {
        name: "Lydia Makasi",
        email: "lydiamakasi@example.com",
        password: "password123",
        phone: "0798675432",
        address: "Nakuru",
        role: "buyer"
      },
      {
        name: "Eric Mutua",
        email: "ericmutua@example.com",
        password: "password123",
        phone: "0778965432",
        address: "Nairobi",
        role: "buyer"
      }
];

async function seedUsers() {
    try {
    await User.deleteMany();
    await Farmer.deleteMany();
    await Buyer.deleteMany();


    // Hash passwords
    for (let user of users) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    // Insert into database
    await User.insertMany(users);

    console.log("Users Seeded Successfully!");
    process.exit();
    } 
    catch (error) {
    console.error("Error seeding users:", error);
    process.exit(1);
    }
}

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected. Starting seed operation...");
    seedUsers(); 
  })
  .catch(err => {
    console.error("\n❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });