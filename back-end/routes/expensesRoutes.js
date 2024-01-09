const express=require("express")
const router=express.Router() 
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middlewares/verifyAuthToken");
const { getExpense,getExpenses,createNewExpense,updateExpense,deleteExpense }=require("../controllers/expensesController")
//admin routes
router.use(verifyIsLoggedIn)
router.use(verifyIsAdmin)

router.get("/admin",getExpenses)
router.get("/admin/:id",getExpense)
router.post("/admin",createNewExpense)
router.delete("/admin/:id",deleteExpense)
router.put("/admin/:id",updateExpense)
module.exports=router