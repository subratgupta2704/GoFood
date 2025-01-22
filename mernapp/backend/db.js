const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

async function fetchFoodData() {
  try {
    // Connect to MongoDB using URI from .env
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Fetch data from food_items collection
    const collection = mongoose.connection.db.collection("food_items");
    const data = await collection.find({}).toArray();

    // Fetch data from foodCategory collection
    const foodCategory = mongoose.connection.db.collection("foodCategory");
    const catdata = await foodCategory.find({}).toArray();

    // Assign to global variables
    global.food_items = data;
    global.foodCategory = catdata;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = fetchFoodData;
