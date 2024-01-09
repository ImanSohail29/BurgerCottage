const express=require("express")
const router=express.Router() 
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middlewares/verifyAuthToken");
const { getReport,getReportByDate }=require("../controllers/reportController")
//admin routes
router.use(verifyIsLoggedIn)
router.use(verifyIsAdmin)

router.get("/admin",getReport)
router.get("/admin/date/:date",getReportByDate)

module.exports=router