const { Router } = require('express')

const passport = require('../config/passport')
const indexController = require('../controllers/indexController')
const upload = require('../config/multer');

const indexRouter = Router()

indexRouter.get("/", indexController.homepageGet)
indexRouter.get("/:folder", indexController.homepageGet)
indexRouter.post("/upload", upload.single('file'), indexController.uploadFilePost);
indexRouter.get('/sign-up', indexController.signupPageGet)
indexRouter.post('/sign-up', indexController.signupPagePost)
indexRouter.get('/log-in', indexController.loginPageGet)
indexRouter.post('/log-in', passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/sign-up"
}))

module.exports = indexRouter;
