const cluster = require("cluster");
const os = require("os");
const http = require("http");

if (cluster.isMaster) {
  const numCPUS = os.cpus().length;
  console.log(`Master process ${process.pid} is running`);
  console.log(`Forking ${numCPUS} workers...`);

  // fork workers (one for each cpu core)
  for (let i = 0; i < numCPUS; i++) {
    cluster.fork();
  }

  // if a worker dies restart it
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  // workers create http servers

  const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Hello from worker ${process.pid}\n`);
  });

  server.listen(3000, () => {
    console.log(`Worker ${process.pid} started and listening on port 3000`);
  });
}
