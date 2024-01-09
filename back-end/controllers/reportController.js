const ObjectId = require("mongodb").ObjectId

const Report = require("../models/ReportModel")
const getReport = async (req, res, next) => {
    try {
        const report = await Report.find({}).sort({ date: "desc" }).orFail()
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
module.exports = { getReport, getReportByDate }