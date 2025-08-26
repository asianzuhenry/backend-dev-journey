// Piping Streams (Read → Write)
const fs = require("fs");

const readStream = fs.createReadStream("bigfile.txt");
const writeStream = fs.createWriteStream("copy.txt");

readStream.pipe(writeStream);

// Transform Streams Example (Uppercase Text)
const { Transform } = require("stream");
const fs2 = require("fs");

const upperCase = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

fs2.createReadStream("input.txt")
  .pipe(upperCase)
  .pipe(fs2.createWriteStream("output.txt"));
