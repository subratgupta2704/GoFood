const mongoose = require("mongoose");

async function fetchFoodData() {
  try {
    await mongoose.connect(
      "mongodb+srv://subratgupta2704:Theshield12345@cluster0.fwifmm6.mongodb.net/gofoodmern?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB");
    const collection = mongoose.connection.db.collection("food_items");
    const data = await collection.find({}).toArray();
    const foodCategory = await mongoose.connection.db.collection(
      "foodCategory"
    );
    const catdata = await foodCategory.find({}).toArray();
    global.food_items = data;
    global.foodCategory = catdata;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = fetchFoodData;
