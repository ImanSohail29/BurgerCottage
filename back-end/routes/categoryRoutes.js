const express=require("express")
const router=express.Router()
const {getCategories,newCategory,deleteCategory}=require("../controllers/categoryController")
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middlewares/verifyAuthToken")

router.get("/",getCategories)

router.use(verifyIsLoggedIn)
router.use(verifyIsAdmin)
router.post("/",newCategory)
router.delete("/:category",deleteCategory)
module.exports=router