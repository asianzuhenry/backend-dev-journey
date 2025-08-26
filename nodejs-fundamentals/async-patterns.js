
// ✅ a) Callbacks (old school)
import fs from 'fs'

fs.readFile('example.txt', 'utf-8', (err, data) => {
    if (err) return console.error("Error reading file:", err)
    console.log("Data:", data)
})

console.log("File read complete")

// ✅ b) Promises (modern)
const fsPromises = fs.promises

fsPromises.readFile('example.txt', 'utf-8')
          .then(data => console.log("Data:", data))
          .catch(err => console.error("Error reading file:", err))

console.log("File read complete")

// ✅ c) Async / Await (best practice)
async function readFile() {
    try {
        const data = await fsPromises.readFile('example.txt', 'utf-8')
        console.log("Data:", data)
    } catch (err) {
        console.error("Error reading file:", err)
    }
}

readFile()