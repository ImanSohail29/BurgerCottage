const express=require("express")
const router=express.Router()
const {getCategories,newCategory,deleteCategory, adminDeleteCategoryImage, adminUpload, getCategoryById, adminUpdateCategory}=require("../controllers/categoryController")
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middlewares/verifyAuthToken")

router.get("/",getCategories)
router.get("/get-one/:id",getCategoryById)


router.use(verifyIsLoggedIn)
router.use(verifyIsAdmin)
router.post("/admin",newCategory)
router.put("/admin/:id",adminUpdateCategory)
router.delete("/admin/:categoryId",deleteCategory)

router.post("/admin/upload", adminUpload)
router.put("/admin/image/:imagePath/:categoryId",adminUpload)
router.delete("/admin/image/:imagePath/:categoryId", adminDeleteCategoryImage)

module.exports=router