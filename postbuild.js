const fs = require("fs");
const path = require("path");

/**
 * Files that need special renaming (not just adding .html extension)
 */
const SPECIAL_RENAMES = {
  "projects-main": "projects.html",
};

/**
 * Recursively finds all files without extensions in a directory
 */
function findFilesWithoutExtensions(directory) {
  const files = fs.readdirSync(directory);
  const extensionlessFiles = [];

  files.forEach((file) => {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Recursively search subdirectories
      extensionlessFiles.push(...findFilesWithoutExtensions(fullPath));
    } else {
      // Check if file has no extension and isn't excluded
      const hasExtension = path.extname(file);
      const isExcluded = file === ".nojekyll";

      if (!hasExtension && !isExcluded) {
        extensionlessFiles.push(fullPath);
      }
    }
  });

  return extensionlessFiles;
}

/**
 * Renames a file from extensionless to .html (with special cases)
 */
function renameToHtml(filePath) {
  const relativePath = path.relative("_site", filePath);
  const finalName = SPECIAL_RENAMES[relativePath] || `${relativePath}.html`;
  const finalPath = path.join("_site", finalName);

  if (fs.existsSync(finalPath)) {
    console.log(`⏭️  Skipping ${filePath} - ${finalPath} already exists`);
    return;
  }

  fs.renameSync(filePath, finalPath);
  console.log(`✅ Renamed ${filePath} → ${finalPath}`);
}

/**
 * Main post-build process: convert extensionless files to .html
 */
function processBuildOutput() {
  console.log("🔄 Processing build output...");

  const extensionlessFiles = findFilesWithoutExtensions("_site");

  extensionlessFiles.forEach(renameToHtml);

  console.log("✨ Post-build processing complete");
}

// Run the process
processBuildOutput();
