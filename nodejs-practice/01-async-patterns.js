import fs from 'fs';

// 1. Callback
fs.readFile('text.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data);
})

// 2. Promises
import fsPromises from 'fs/promises'

fsPromises.readFile('text.txt', 'utf-8')
          .then(data => console.log(data))
          .catch(err => console.log(err))

// 3. async/await
async function readFile() {
    try {
        const data = await fsPromises.readFile('text.txt', 'utf-8')
        console.log(data);
        
    } catch (error) {
        console.log(error);
        
    }
}

readFile()