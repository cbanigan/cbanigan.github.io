const fs = require("fs");
const path = require("path");

// Files to rename from extensionless to .html
const filesToRename = [
  "about",
  "resume",
  "projects-main",
  "projects/research",
  "projects/battleship",
  "projects/after-effects",
];

// Special handling for projects-main -> projects.html
const specialRenames = {
  "projects-main": "projects.html",
};

filesToRename.forEach((filename) => {
  const sourcePath = path.join("_site", filename);
  const destFilename = specialRenames[filename] || filename + ".html";
  const destPath = path.join("_site", destFilename);

  // Check if the source file exists and destination doesn't
  if (fs.existsSync(sourcePath) && !fs.existsSync(destPath)) {
    try {
      fs.renameSync(sourcePath, destPath);
      console.log(`Renamed ${sourcePath} to ${destPath}`);
    } catch (error) {
      console.error(`Error renaming ${sourcePath}:`, error);
    }
  }
});

console.log("Post-build processing complete");
