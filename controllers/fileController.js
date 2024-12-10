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
    const folderPath = path.resolve(__dirname, '../', folder || '');
    const items = await fs.readdir(folderPath, { withFileTypes: true });

    return items.map(item => ({
        name: item.name,
        isDirectory: item.isDirectory(),
    }));
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  makeFolder,
  readFolder
}
