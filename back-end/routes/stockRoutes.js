const express=require("express")
const router=express.Router()
const {getStocks,newStock,deleteStock, getStockById, adminUpdateStock}=require("../controllers/stockController")
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middlewares/verifyAuthToken")





router.use(verifyIsLoggedIn)
router.use(verifyIsAdmin)


router.get("/admin",getStocks)
router.get("/admin/get-one/:stockId",getStockById)
router.post("/admin",newStock)
router.put("/admin/:stockId",adminUpdateStock)
router.delete("/admin/:stockId",deleteStock)

module.exports=router