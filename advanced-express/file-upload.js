import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import multer from "multer";

const app = express();

// Needed to resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ Serve the HTML page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "upload.html"));
});

// Handle uploads
app.post("/upload", upload.single("profilePic"), (req, res) => {
  console.log(req.file);
  console.log(req.body);
  res.send("File uploaded successfully!");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
