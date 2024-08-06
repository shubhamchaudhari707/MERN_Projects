const express = require("express")
const router = express.Router()
const { registerUser, loginController, logout, forgotPassword, resetPassword, getUserDetails, updateUserPassword, updateUserProfile, getAllUsers,getSingleUser, updateUserRole, deleteUser } = require("../controller/userController")
const { isAuthenticatedUser, isAdmin } = require("../middileware/auth")

//create a register
router.post("/register", registerUser)

//login
router.post("/login", loginController)

// reset password
router.post("/password/forgot", forgotPassword)

//reset password
router.put("/password/reset/:token", resetPassword)

//logout 
router.get("/logout", logout)

//get user detils only login user details
router.get("/me", isAuthenticatedUser, getUserDetails)

//update user password
router.put("/password/update", isAuthenticatedUser, updateUserPassword)

//update user profile
router.put("/me/update", isAuthenticatedUser, updateUserProfile)

//get all users -- Admin
router.get("/admin/users", isAuthenticatedUser, isAdmin, getAllUsers)

//get single users details -- Admin
router.get("/admin/user/:id", isAuthenticatedUser, isAdmin, getSingleUser)

//update user role -- Admin
router.put("/admin/user/:id", isAuthenticatedUser, isAdmin, updateUserRole)

//delete user -- Admin
router.delete("/admin/user/:id", isAuthenticatedUser, isAdmin, deleteUser)

module.exports = router