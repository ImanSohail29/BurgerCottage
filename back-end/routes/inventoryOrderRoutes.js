const express = require('express')
const router = express.Router()
const { verifyIsLoggedIn, verifyIsAdmin } = require('../middlewares/verifyAuthToken')

const { getInventoryOrdersVendor,createNewInventoryOrder,PayVendor, deleteInventoryOrder, getInventoryTransactions } = require("../controllers/inventoryOrderController")
router.use(verifyIsLoggedIn)
router.use(verifyIsAdmin)

router.get("/admin/:vendorId/inventory-orders",getInventoryOrdersVendor)
router.post("/admin",createNewInventoryOrder)
router.post("/admin/:vendorId/pay-vendor",PayVendor)
router.get("/admin/:vendorId/inventory-transactions",getInventoryTransactions)
router.delete("/admin/:vendorId/inventory-orders/:orderId",deleteInventoryOrder)



module.exports=router