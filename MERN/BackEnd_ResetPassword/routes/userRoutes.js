const express = require("express")
const routes = express.Router()

const { registerController, forgotpassword, reset_password } = require("../controller/userController")


routes.post("/register", registerController)

routes.post("/forgot-password", forgotpassword)

routes.get("/reset-password", reset_password)


module.exports = routes









