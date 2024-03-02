const ObjectId = require("mongodb").ObjectId

const Report = require("../models/ReportModel")
const getReport = async (req, res, next) => {
    try {
        const report = await Report.find({}).sort({createdAt:"asc"}).orFail()
        return res.json(report)
    } catch (error) {
        next(error)
    }
}
const getReportByDate = async (req, res, next) => {
    try {
        const report = await Report.find({date:req.query.date}).orFail()
        return res.send(report);
    } catch (error) {
        next(error)
    }
}
const getReportFromDateToDate = async (req, res, next) => {
    try {
        console.log("req.body.startDate: "+req.query.startDate+"req.body.endDate: "+req.query.endDate)
            const start = new Date(req.query.startDate);
            start.setHours(0, 0, 0, 0);
            const end = new Date(req.query.endDate);
            console.log("startDate: "+start+"endDate: "+end)
            end.setHours(23, 59, 59, 999);
            const reportData = await Report.find({
                createdAt: {
                    $gte: start,
                    $lte: end,
                }
            }).sort({ createdAt: "asc" });
            console.log("reportData:"+reportData)
        return res.send(reportData);
    } catch (error) {
        next(error)
    }
}
const deleteAllReports = async (req, res, next) => {
    try {
        const Reports = await Report.deleteMany({}).orFail();
        res.json({ message: "reports deleted" });
      } catch (err) {
        next(err);
      }
}
module.exports = { getReport, getReportByDate,getReportFromDateToDate,deleteAllReports }