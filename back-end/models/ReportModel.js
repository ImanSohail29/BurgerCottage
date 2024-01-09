const mongoose = require("mongoose")

const ReportSchema = mongoose.Schema({
    date:{type:String},
    totalExpenses:{type:Number},
    totalSale:{type:Number},
    profit:{type:Number},
    totalProfit:{type:Number}
})
const Report = mongoose.model("Report", ReportSchema)
module.exports = Report;