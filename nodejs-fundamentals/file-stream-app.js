import http from "http";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

const UPLOADS_DIR = path.join(__dirname, "uploads");

// make sure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/upload") {
    const filePath = path.join(UPLOADS_DIR, `uploaded.txt`); // uploaded files are given a unique name based on the timestamp
    const writeStream = fs.createWriteStream(filePath); // create a writable stream to the new file

    req.pipe(writeStream); // pipe the request data to the writable stream

    writeStream.on("finish", () => {
      // all data has been written
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("✅ File uploaded successfully");
    });

    writeStream.on("error", (err) => {
      // an error occurred while writing the file
      console.error("Error writing file:", err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("❌ Error uploading file");
    });
  } else if (req.method === "GET" && req.url === "/downloads") {
    const filePath = path.join(UPLOADS_DIR, "uploaded.txt");

    if (!fs.existsSync(filePath)) {
      res.statusCode = 404;
      return res.end("❌ No file found to download.");
    }

    const readStream = fs.createReadStream(filePath);

    // Set headers
    res.writeHead(200, {
      "Content-Disposition": "attachment; filename=downloaded.txt",
      "Content-Type": "text/plain",
    });

    // Pipe file → response stream
    readStream.pipe(res);

    readStream.on("error", (err) => {
      console.error("❌ Download error:", err);
      res.statusCode = 500;
      res.end("Download failed.");
    });
  } else {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>File Stream Demo</title>
      </head>
      <body>
        <h2>File Stream Demo</h2>
        <form action="/upload" method="post" enctype="multipart/form-data">
          <input type="file" name="file" />
          <button type="submit">Upload</button>
        </form>
        <p><a href="/download">Download uploaded file</a></p>
      </body>
      </html>
    `);
  }
});

server.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});
