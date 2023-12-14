const express=require("express")
const router=express.Router() 
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middlewares/verifyAuthToken");
const { getVendors,getVendor, updateVendor, deleteVendor, createNewVendor }=require("../controllers/vendorController")
//admin routes
router.use(verifyIsLoggedIn)
router.use(verifyIsAdmin)

router.get("/admin",getVendors)
router.get("/admin/:id",getVendor)
router.post("/admin",createNewVendor)
router.delete("/admin/:id",deleteVendor)
router.put("/admin/:id",updateVendor)
module.exports=router