const fs = require("fs");
const path = require("node:path");

const folderPath = path.join(__dirname, "..", "prisma");
const exceptionFile = "schema.prisma";

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  files.forEach((file) => {
    if (file !== exceptionFile) {
      const filePath = path.join(folderPath, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error("Error stating file:", err);
          return;
        }

        if (stats.isFile()) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error("Error deleting file:", err);
            } else {
              console.log(`Deleted file: ${file}`);
            }
          });
        } else if (stats.isDirectory()) {
          fs.rmdir(filePath, { recursive: true }, (err) => {
            if (err) {
              console.error("Error deleting directory:", err);
            } else {
              console.log(`Deleted directory: ${file}`);
            }
          });
        }
      });
    }
  });
});
