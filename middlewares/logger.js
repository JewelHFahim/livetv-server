const fs = require("fs");
const path = require("path");

// Create a write stream in append mode for logs
const logStream = fs.createWriteStream(path.join(__dirname, "logs.txt"), {
  flags: "a",
});

// Middleware function for logging
const logger = (req, res, next) => {
  const start = Date.now();
  const { method, url, body } = req;

  const requestLog = `\n[${new Date().toISOString()}] ${method} ${url}\n`;
  logStream.write(requestLog);

  const originalSend = res.send;

  res.send = function (body) {
    const duration = Date.now() - start;
    const responseLog = `Response Status: ${res.statusCode} - Time Taken: ${duration}ms\n`;
    logStream.write(responseLog);

    return originalSend.call(this, body);
  };

  next();
};

module.exports = logger;
