const express=require("express")
const { getInventoryOrdersVendor,getVendorInventoryOrdersByDate, getVendorInventoryPaymentByDate,createNewInventoryOrder } = require("../controllers/inventoryOrderController")

const router=express.Router()
router.get("/admin/:vendorId/inventory-orders",getInventoryOrdersVendor)
router.get("/admin/:vendorId/inventory-orders/bydate",getVendorInventoryOrdersByDate)
router.get("/admin/:vendorId/inventory-orders/payment/bydate",getVendorInventoryPaymentByDate)
router.post("/admin/:vendorId/",createNewInventoryOrder)



module.exports=router