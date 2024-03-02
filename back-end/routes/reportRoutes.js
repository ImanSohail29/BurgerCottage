const express=require("express")
const router=express.Router() 
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middlewares/verifyAuthToken");
const { getReport,getReportByDate, getReportFromDateToDate, deleteAllReports }=require("../controllers/reportController")
router.delete("/deleteAll",deleteAllReports)

//admin routes
router.use(verifyIsLoggedIn)
router.use(verifyIsAdmin)

router.get("/admin",getReport)
router.get("/admin/date/:date",getReportByDate)
router.get("/admin/toDate",getReportFromDateToDate)

module.exports=router