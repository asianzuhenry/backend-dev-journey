import fs from "fs";
import path from "path/posix";
const __dirname = path.dirname(fileURLToPath(import.meta.url))

fs.writeFile("new-file.txt", "some text content", (err) => {
  if (err) throw err;
  console.log("file written");
});

fs.readFile("new-file.txt", "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

// a cleaner method with promises
import fsp from 'fs/promises'
import { fileURLToPath } from "url";
fsp.readFile("example.txt", "utf-8")
  .then((data) => console.log("File:", data))
  .catch((err) => console.error(err));

// much cleaner with async await
async function readFile() {
  try {
    const data = await fs.readFile("example.txt", "utf-8");
    console.log("File:", data);
  } catch (err) {
    console.error(err);
  }
}

readFile();


const fp = path.join(__dirname, 'bigfile', 'dx.mp4')
const fpc = path.join(__dirname, 'bigfile', 'the-copy.mp4')

const readf = fs.createReadStream(fp)
const writef = fs.createWriteStream(fpc)

readf.pipe(writef)

writeStream.on("finish", () => {
  console.log("✅ File copied successfully!");
});

readStream.on("error", (err) => {
  console.error("❌ Error reading file:", err);
});

writeStream.on("error", (err) => {
  console.error("❌ Error writing file:", err);
});