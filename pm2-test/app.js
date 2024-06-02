const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end("Hello World!");
});

server.listen(8888);
console.log("Server running at http://127.0.0.1:8888/");
