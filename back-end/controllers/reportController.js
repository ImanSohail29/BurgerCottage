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
            const start = new Date(req.body.startDate);
            start.setHours(0, 0, 0, 0);
            const end = new Date(req.body.endDate);
            end.setHours(23, 59, 59, 999);
    
            const reportData = await Report.find({
                createdAt: {
                    $gte: start,
                    $lte: end,
                }
            }).sort({ createdAt: "asc" });
            res.send(order);
        return res.send(reportData);
    } catch (error) {
        next(error)
    }
}
module.exports = { getReport, getReportByDate,getReportFromDateToDate }