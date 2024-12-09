const fs = require('fs').promises
const path = require('path')

async function fileSearch(startPath, targetName) {
  const results = [];
  console.log(startPath)
  console.log(targetName)

  async function searchDirectory(directory) {
    try {
      const entries = await fs.readdir(directory, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);

        if (entry.name === targetName) {
          results.push(fullPath);
        }

        if (entry.isDirectory()) {
          await searchDirectory(fullPath);
        }
      }
    } catch (err) {
      console.error(`Error while accessing ${directory}: ${err.message}`);
    }
  }

  await searchDirectory(startPath);
  return results;
}

module.exports = fileSearch;
