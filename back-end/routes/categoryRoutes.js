const express=require("express")
const router=express.Router()
const {getCategories,newCategory,deleteCategory, adminDeleteCategoryImage, adminUpload}=require("../controllers/categoryController")
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middlewares/verifyAuthToken")

router.get("/",getCategories)

router.use(verifyIsLoggedIn)
router.use(verifyIsAdmin)
router.post("/admin",newCategory)
router.delete("/admin/:categoryId",deleteCategory)

router.post("/admin/upload", adminUpload)
router.put("/admin/image/:imagePath/:categoryId",adminUpload)
router.delete("/admin/image/:imagePath/:categoryId", adminDeleteCategoryImage)

module.exports=router