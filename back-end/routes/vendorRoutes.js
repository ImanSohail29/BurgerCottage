const express=require("express")
const router=express.Router() 
const { getVendors,getVendor, updateVendor, deleteVendor, createNewVendor }=require("../controllers/vendorController")
router.get("/admin",getVendors)
router.get("/admin/:id",getVendor)
router.post("/admin",createNewVendor)
router.delete("/admin/:id",deleteVendor)
router.put("/admin/:id",updateVendor)
module.exports=router