const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let filePath = req.url;

  // Handle root path
  if (filePath === "/" || filePath === "") {
    filePath = "/index.html";
  }

  // Handle clean URLs by adding .html extension for routes without extensions
  if (!filePath.includes(".") && !filePath.endsWith("/")) {
    // Special case: /projects serves projects/index.html
    if (filePath === "/projects") {
      filePath = "/projects/index.html";
    }
    // All other routes get .html appended
    else {
      filePath += ".html";
    }
  }
  // Handle directory routes ending with /
  else if (filePath.endsWith("/")) {
    // /projects/ serves projects/index.html
    if (filePath === "/projects/") {
      filePath = "/projects/index.html";
    }
  }

  // Remove leading slash and resolve to actual file path
  filePath = path.join(__dirname, filePath);

  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("File not found");
      return;
    }

    // Read and serve the file
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal server error");
        return;
      }

      // Set content type based on file extension
      const ext = path.extname(filePath).toLowerCase();
      let contentType = "text/plain";
      if (ext === ".html") contentType = "text/html";
      else if (ext === ".css") contentType = "text/css";
      else if (ext === ".js") contentType = "application/javascript";
      else if (ext === ".png") contentType = "image/png";
      else if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
      else if (ext === ".svg") contentType = "image/svg+xml";

      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    });
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("Clean URLs supported: /about, /resume, /projects");
});
