const express = require('express')
const router = express.Router()
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middlewares/verifyAuthToken");
const {getUsers, registerUser, loginUser, updateUserProfile, getUserProfile, writeReview, getUser, updateUser, deleteUser, registerUserFromAdmin} = require("../controllers/customerController")

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post('/register-admin', registerUserFromAdmin)

// user logged in routes:
router.use(verifyIsLoggedIn);
router.put("/profile", updateUserProfile);
router.get('/profile/:userId', getUserProfile)
router.post('/review/:productId', writeReview)

// admin routes:
router.use(verifyIsAdmin);
router.get("/admin", getUsers)
router.get("/:id", getUser);
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router