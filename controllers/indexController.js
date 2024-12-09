const client = require('../prisma/prismaClient')
const fileController = require('./fileController')
const fileSearch = require('./fileSearch')
const path = require('path')

async function homepageGet(req, res, next) {
  try {
    (async () => {
      const matches = await fileSearch('/Users/oliverpreiss/code/odin/fileuploader/', req.params.folder);
      console.log(matches)
      if (matches.length > 0) {
        console.log('Matches found:');
        matches.forEach(match => console.log(match));
      } else {
        console.log('No matches found');
      }
    })();


    const files = await fileController.readFolder(req.params.folder)

    res.render("index", {
      user: req.user,
      files: files
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
