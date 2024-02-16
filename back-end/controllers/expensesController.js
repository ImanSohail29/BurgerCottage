const Expenses = require("../models/ExpensesModel")
const Report = require("../models/ReportModel")

const getExpenses = async (req, res, next) => {
    try {
        const expenses = await Expenses.find({}).sort({ date: "desc" })
        return res.json(expenses)
    } catch (error) {
        next(error)
    }
}
const getExpense = async (req, res, next) => {
    try {
        const expense = await Expenses.findById(req.params.id).orFail()

        return res.send(expense);
    } catch (error) {
        next(error)
    }
}
const createNewExpense = async (req, res, next) => {
    try {
        const { name, quantity, pricePerItem, totalAmount } = req.body
        if (!(name && totalAmount)) {
            return res.status(400).send("Enter all required Inputs!")
        }
        else {

            const dateTimeNow = new Date()

            let dateTimeYesterday = new Date();
            dateTimeYesterday.setDate(dateTimeYesterday.getDate() - 1);
            const dateYesterday = dateTimeYesterday.toDateString()
            await Expenses.create({
                name: name,
                quantity: quantity,
                pricePerItem: pricePerItem,
                totalAmount: totalAmount,
                date: dateTimeNow,
            })
            if (dateTimeNow.getHours() < 5) {
                dateTimeNow.setDate(dateTimeNow.getDate() - 1)
            }
            const dateNow = dateTimeNow.toDateString()
            console.log("dateNow : " + dateNow)
            const todaysReport = await Report.findOne({ date: dateNow })


            const yesterdaysReport1 = await Report.find().sort({ "$natural": -1 }).limit(2)
            const yesterdaysReport = yesterdaysReport1[1]
            console.log("todaysReport : " + todaysReport)
            console.log("yesterdayReport : " + yesterdaysReport)
            let previousProfit = 0
            if (yesterdaysReport) {
                previousProfit = yesterdaysReport.totalProfit
            }
            if (todaysReport) {
                todaysReport.totalExpenses = parseInt(todaysReport.totalExpenses) + parseInt(totalAmount)
                todaysReport.profit = parseInt(todaysReport.profit) - parseInt(totalAmount)
                todaysReport.totalProfit = previousProfit + todaysReport.profit
                todaysReport.save()

            }
            else {
                previousProfit=yesterdaysReport1[0].totalProfit
                let todaysProfit = 0 - totalAmount
                await Report.create({
                    date: dateNow,
                    totalExpenses: totalAmount,
                    totalSale: 0,
                    profit: todaysProfit,
                    totalProfit: previousProfit + todaysProfit
                })
            }
            console.log("Updated todaysReportCreated : " + todaysReport)
            return res.status(201).json(
                {
                    success: "Expense created!",
                }
            )
        }
    }
    catch (error) {
        next(error)
    }
}
const updateExpense = async (req, res, next) => {
    try {
        const expense = await Expenses.findById(req.params.id).orFail()
        const { name, quantity, pricePerItem, totalAmount } = req.body;
        if (!(name && totalAmount)) {
            return res.status(400).send("Enter all required Inputs!")
        }
        else {
            const previousValueOfUpdatedExpense = expense.totalAmount
            expense.name = name || expense.name
            expense.quantity = quantity || expense.quantity
            expense.pricePerItem = pricePerItem || expense.pricePerItem
            expense.totalAmount = totalAmount || expense.totalAmount
            await expense.save()

            const dateTimeNow = new Date()
            console.log("dateNow : " + dateNow)
            let dateTimeYesterday = new Date();
            dateTimeYesterday.setDate(dateTimeYesterday.getDate() - 1);
            const dateYesterday = dateTimeYesterday.toDateString()

            if (dateTimeNow.getHours() < 5) {
                dateTimeNow.setDate(dateTimeNow.getDate() - 1)
            }
            const dateNow = dateTimeNow.toDateString()
            console.log("dateNow : " + dateNow)
            const todaysReport = await Report.findOne({ date: dateNow })
            const yesterdaysReport1 = await Report.find().sort({ "$natural": -1 }).limit(2)
            const yesterdaysReport = yesterdaysReport1[1]
            console.log("todaysReport : " + todaysReport)
            console.log("yesterdayReport : " + yesterdaysReport)
            let previousProfit = 0
            if (yesterdaysReport) {
                previousProfit = yesterdaysReport.totalProfit
            }
            if (todaysReport) {
                todaysReport.totalExpenses = parseInt(todaysReport.totalExpenses) - parseInt(previousValueOfUpdatedExpense)
                todaysReport.profit = parseInt(todaysReport.profit) + parseInt(previousValueOfUpdatedExpense)

                todaysReport.totalExpenses = parseInt(todaysReport.totalExpenses) + parseInt(totalAmount)
                todaysReport.profit = parseInt(todaysReport.profit) - parseInt(totalAmount)
                todaysReport.totalProfit = previousProfit + todaysReport.profit
            }
            else {
                previousProfit=yesterdaysReport1[0].totalProfit
                let todaysProfit = 0 - totalAmount
                await Report.create({
                    date: dateNow,
                    totalExpenses: totalAmount,
                    totalSale: 0,
                    profit: todaysProfit,
                    totalProfit: previousProfit + todaysProfit
                })
            }
            console.log("Updated todays Report Created : " + todaysReport)
            return res.json("Expense updated")
        }
    }
    catch (error) {
        next(error)
    }
}
const deleteExpense = async (req, res, next) => {
    try {
        const expense = await Expenses.findById(req.params.id).orFail()
        const previousValueOfUpdatedExpense = expense.totalAmount
        await expense.deleteOne()


        const dateTimeNow = new Date()
        if (dateTimeNow.getHours() < 5) {
            dateTimeNow.setDate(dateTimeNow.getDate() - 1)
        }
        const dateNow = dateTimeNow.toDateString()
        console.log("dateNow : " + dateNow)
        let dateTimeYesterday = new Date();

        dateTimeYesterday.setDate(dateTimeYesterday.getDate() - 1);
        const dateYesterday = dateTimeYesterday.toDateString()


        const todaysReport = await Report.findOne({ date: dateNow })
        const yesterdaysReport1 = await Report.find().sort({ "$natural": -1 }).limit(2)
        const yesterdaysReport = yesterdaysReport1[1]

        console.log("todaysReport : " + todaysReport)
        console.log("yesterdayReport : " + yesterdaysReport)
        let previousProfit = 0
        if (yesterdaysReport) {
            previousProfit = yesterdaysReport.totalProfit
        }
        if (todaysReport) {
            todaysReport.totalExpenses = parseInt(todaysReport.totalExpenses) - parseInt(previousValueOfUpdatedExpense)
            todaysReport.profit = parseInt(todaysReport.profit) + parseInt(previousValueOfUpdatedExpense)
            todaysReport.totalProfit = previousProfit + todaysReport.profit
        }
        else {
            previousProfit=yesterdaysReport1[0].totalProfit
            let todaysProfit = 0 - totalAmount
            await Report.create({
                date: dateNow,
                totalExpenses: 0,
                totalSale: 0,
                profit: todaysProfit,
                totalProfit: previousProfit + todaysProfit
            })
        }
        console.log("Updated todays Report Created : " + todaysReport)
        return res.send("Expense removed")
    }
    catch (error) {
        next(error)
    }
}
module.exports = { getExpense, getExpenses, createNewExpense, updateExpense, deleteExpense }