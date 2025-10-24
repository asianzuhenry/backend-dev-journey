// import mongodb module
import mongoose from 'mongoose';

// 1️⃣ Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Connection error:", err));

// 2️⃣ Define Schema & Model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
  },
  age: {
    type: Number,
    min: [0, "Age must be positive"],
    max: [120, "Age is too high!"],
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

// 3️⃣ CRUD Operations
async function runCRUD() {
  try {
    // // CREATE
    const newUser = new User({ name: "Henry", email: "henry@example.com", age: 25 });
    await newUser.save();
    console.log("🟢 Created:", newUser);

    // // CREATE
    const newUser2 = new User({ name: "Duncan", email: "duncan@example.com", age: 30 });
    await newUser2.save();
    console.log("🟢 Created:", newUser2);

    // READ
    const users = await User.find();
    console.log("🔵 All Users:", users);

    // UPDATE
    const updatedUser = await User.findOneAndUpdate(
      { email: "henry@example.com" },
      { age: 26 },
      { new: true, runValidators: true }
    );
    console.log("🟡 Updated:", updatedUser);

    // DELETE
    // const deletedUser = await User.findOneAndDelete({ email: "henry@example.com" });
    // console.log("🔴 Deleted:", deletedUser);

  } catch (err) {
    console.error("⚠️ Error:", err.message);
  } finally {
    mongoose.connection.close();
  }
}

runCRUD();
