// fs
import fs from "fs"
// import path module
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));


// fs module

// read a file
fs.readFile('text.txt', 'utf-8', (err, data) => {
    if (err) throw err // throws an error possibly if the file is not found
    console.log(data); // prints the file content
    
})

// write to a file
fs.writeFile('text.txt', 'am adding some content', (err) => {
    if (err) throw err
    console.log('file written successfully');
    
})

// append to a file 
// if the file does not exist, it creates it then appends to it
fs.appendFile('text.txt', '\nwe have appended to the file', (err) => {
    if (err) throw err 
    console.log("content added")
})

// delete a file
// will throw an error if the specified file does not exist
// fs.unlink('deleted.txt', (err) => {
//     if (err) throw err
//     console.log("file deleted");
    
// })

// // making a directory
// fs.mkdir('mydir', (err) => {
//     if (err) throw err
//     console.log("directory created");
    
// })


// path module
const filePath = path.join(__dirname, "fold", 'text.txt')
console.log(filePath);

console.log(path.extname("example.txt")); // .txt // gets the file extension

console.log(path.dirname("/home/henry/project/file.js"));
// -> /project


console.log(path.basename("/home/henry/project/file.js")); // gets trhe file itself
// -> file.js
