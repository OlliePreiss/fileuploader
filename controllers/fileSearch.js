const fs = require('fs').promises
const path = require('path')

async function getFilePath(startPath, targetName) {
  console.log('Start path :', startPath)
  console.log('targetName: ', targetName)
  async function searchDirectory(directory) {
    try {
      const entries = await fs.readdir(directory, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);

        if (entry.name === targetName) {
          return fullPath;
        }

        if (entry.isDirectory()) {
          await searchDirectory(fullPath);
        }
      }
    } catch (err) {
      console.error(`Error while accessing ${directory}: ${err.message}`);
    }
  }

  const result = await searchDirectory(startPath);
  const string = result.replace(/^.*\/fileuploader/, "/fileuploader"); // fileuploader is the base file
  console.log(result)
  console.log(string)
  return string;
}

module.exports = getFilePath;
