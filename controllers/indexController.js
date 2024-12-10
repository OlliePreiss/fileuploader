const client = require('../prisma/prismaClient')
const fileController = require('./fileController')
const fileSearch = require('./fileSearch')
const path = require('path')

async function homepageGet(req, res, next) {
  try {
    const folder = req.params.folder || '';
    console.log('Target folder: ', folder)
    const rootFile = __dirname.replace(/\/fileuploader\/.*/, "/fileuploader/"); // fileuploader is the base file
    const filePath = await fileSearch(rootFile, folder)
    const folderContents = await fileController.readFolder(filePath)
    folderContents.forEach((folder) => console.log(folder.name))

    res.render("index", {
      user: req.user,
      files: folderContents
      })
  } catch (err) {
    console.error('Error reading folder', err);
    next(err);
  }
}

function uploadFilePost(req, res) {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send(`File uploaded successfully: ${req.file.path}`);
}

function signupPageGet(req, res) {
  res.render('sign-up')
}

async function signupPagePost(req, res, next) {
  try {
    const { name, email, password } = req.body;
    await client.addUser(name, email, password);
    res.redirect("/log-in");
  } catch (err) {
    next(err);
  }
}

function loginPageGet(req, res) {
  res.render('log-in')
}

module.exports = {
  homepageGet,
  uploadFilePost,
  signupPageGet,
  signupPagePost,
  loginPageGet,
}
