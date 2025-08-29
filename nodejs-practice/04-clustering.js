const cluster = require("cluster")
import http from "http";
import os from "os";


if (cluster.isMaster) {
    const numCPUS = os.cpus().length;
    console.log(`Master process ${process.pid} is running`);
    console.log(`Forking ${numCPUS} workers...`);

    for (let i = 0; i < numCPUS; i++) {
        cluster.fork();
    }
} else {
    const server = http.createServer((req, res) => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(`Hello from worker ${process.pid}\n`);
    });

    server.listen(3000, () => {
        console.log(`Worker ${process.pid} started and listening on port 3000`);
    });
}