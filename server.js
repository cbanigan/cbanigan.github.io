const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let filePath = req.url;

  if (filePath === "/" || filePath === "") {
    filePath = "/index.html";
  }

  // Handle clean URLs generically
  else if (!filePath.includes(".")) {
    if (filePath.endsWith("/")) {
      filePath += "index.html";
    }
    // For other paths, first try adding .html, then try /index.html
    else {
      const htmlPath = filePath + ".html";
      const indexPath = filePath + "/index.html";

      const fullHtmlPath = path.join(__dirname, htmlPath);
      const fullIndexPath = path.join(__dirname, indexPath);

      // Use synchronous check since we're in async context
      // In production, this would be cached or pre-computed
      try {
        require("fs").accessSync(fullHtmlPath, require("fs").constants.F_OK);
        filePath = htmlPath;
      } catch {
        try {
          require("fs").accessSync(fullIndexPath, require("fs").constants.F_OK);
          filePath = indexPath;
        } catch {
          filePath = htmlPath; // Default to .html even if it doesn't exist (will 404)
        }
      }
    }
  }

  filePath = path.join(__dirname, filePath);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("File not found");
      return;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal server error");
        return;
      }

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
});
