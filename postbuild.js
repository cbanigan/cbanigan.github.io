const fs = require("fs");
const path = require("path");

// Special handling for specific file renames
const specialRenames = {
  "projects-main": "projects.html",
};

function walkDirectory(dir, callback) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Recursively walk subdirectories
      walkDirectory(fullPath, callback);
    } else {
      // Check if it's a file without extension
      const ext = path.extname(file);
      if (!ext && file !== '.nojekyll') {
        // This is a file without extension (except .nojekyll)
        callback(fullPath, file);
      }
    }
  });
}

console.log("Starting post-build file processing...");

// Walk the _site directory and rename extensionless files to .html
walkDirectory("_site", (fullPath, filename) => {
  // Get the relative path from _site
  const relativePath = path.relative("_site", fullPath);
  const destFilename = specialRenames[relativePath] || relativePath + ".html";
  const destPath = path.join("_site", destFilename);

  // Check if the destination already exists
  if (fs.existsSync(destPath)) {
    console.log(`Skipping ${fullPath} - ${destPath} already exists`);
    return;
  }

  try {
    fs.renameSync(fullPath, destPath);
    console.log(`Renamed ${fullPath} to ${destPath}`);
  } catch (error) {
    console.error(`Error renaming ${fullPath}:`, error);
  }
});

console.log("Post-build processing complete");
