## 1️⃣ Async Patterns

Scenario: You are building a file uploader that processes large files.

Objective: Learn to handle async operations with callbacks, promises, and async/await.

### Task:

- **Read multiple files from disk asynchronously.**

- **Print total combined size without blocking execution.**

Goal: Compare all 3 async styles and understand readability + error handling.

## 2️⃣ File Streams

Scenario: You need to create a file backup system.

Objective: Learn streaming for large file operations.

### Task:

- **Read a large file (input.txt) using streams.**

- **Write it to backup.txt with .pipe().**

- **Add compression using zlib.**

Goal: See how streams save memory compared to fs.readFile().

## 3️⃣ JWT Authentication

Scenario: Build a simple login system.

Objective: Learn JWT issue, verify, refresh flow.

### Task:

- **Create /login route that issues JWT.**

- **Create /profile route that requires JWT.**

- **Add /refresh route to issue new tokens.**

Goal: Understand token lifecycle, stateless auth.

## 4️⃣ Clustering

Scenario: Your app must handle 1,000 requests per second.

Objective: Learn to use cluster to scale on multiple cores.

### Task:

- **Create a clustered HTTP server.**

- **Print the worker PID handling each request.**

Goal: Observe load distribution between workers.

## 5️⃣ Scaling

Scenario: You’re deploying your app to production.

Objective: Learn scaling strategies.

### Task:

- **Run app in single-thread mode and benchmark using wrk.**

- **Run app with clustering (PM2) and benchmark again.**

- **Compare Requests/sec.**

Goal: Prove scaling improves throughput.