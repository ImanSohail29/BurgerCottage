const express = require('express')
const router = express.Router()
const { 
    getFoodItems,
    getFoodItemById,
    getBestsellers,
    adminGetFoodItems,
    adminDeleteFoodItem,
    adminCreateFoodItem,
    adminUpdateFoodItem,
    adminUpload,
    adminDeleteFoodItemImage,
} = require("../controllers/foodItemController")
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middlewares/verifyAuthToken")


router.get("/category/:categoryName", getFoodItems)
router.get("/", getFoodItems)
router.get("/bestSeller", getBestsellers)
router.get("/get-one/:id", getFoodItemById)
//admin routes
router.use(verifyIsLoggedIn)
router.use(verifyIsAdmin)

router.get("/admin", adminGetFoodItems)
router.post("/admin", adminCreateFoodItem)
router.put("/admin/:id", adminUpdateFoodItem)
router.delete("/admin/:id", adminDeleteFoodItem)

router.post("/admin/upload", adminUpload)
router.delete("/admin/image/:imagePath/:foodItemId", adminDeleteFoodItemImage)


module.exports = router