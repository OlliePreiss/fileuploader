const fs = require('fs').promises
const { join } = require('node:path');
const path = require('path')

async function makeFolder() {
  try {
    const folder = join(__dirname, 'test')
    const folderCreated = await fs.mkdir(folder, { recursive: true })
    return folderCreated
  } catch (err) {
    console.log(err)
    throw err;
  }
}

async function readFolder(folder) {
  try {
    const folderPath = path.join(__dirname, '../');
    const items = await fs.readdir(folderPath);

    const sortedItems = await Promise.all(items.map(async (item) => {
      const stat = await fs.stat(item)

      return {
        name: item,
        isDirectory: stat.isDirectory(),
      }
    }));
    return sortedItems
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  makeFolder,
  readFolder
}
