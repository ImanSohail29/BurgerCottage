const Vendor = require("../models/VendorModel")
const ObjectId = require("mongodb").ObjectId

const InventoryOrder = require("../models/InventoryOrderModel")

const InventoryOrderPayment = require("../models/InventoryOrderPaymentModel")
const InventoryTransactionsByDate = require("../models/InventoryTransactionsByDate")
const getInventoryOrdersVendor = async (req, res, next) => {
    try {
        const inventoryOrdersVendor = await InventoryOrder.find({ vendor: new ObjectId(req.params.vendorId) }).sort({ date: "desc" }).orFail()
        return res.json(inventoryOrdersVendor)
    } catch (error) {
        next(error)
    }
}
const getInventoryOrderVendor = async (req, res, next) => {
    try {
        const inventoryOrder = await Vendor.findById(req.params.id).orFail()
        return res.send(inventoryOrder);
    } catch (error) {
        next(error)
    }
}
const createNewInventoryOrder = async (req, res, next) => {
    try {
        console.log("req : " + req.body.vendorId)
        const { vendorId, itemName, quantity, pricePerItem, totalAmount } = req.body
        if (!(vendorId && itemName && totalAmount)) {
            return res.status(400).send("Enter all required Inputs!")
        }
        else {
            await Vendor.findById(vendorId).then((vendor) => {
                console.log("vendor: " + vendor)
                vendor.totalAmount += parseInt(totalAmount);
                vendor.save();
            })
            const dateTimeNow = new Date()
            const dateNow = dateTimeNow.toDateString()
            console.log("dateNow : " + dateNow)
            await InventoryOrder.create({
                vendor: new ObjectId(vendorId),
                ingredient: itemName,
                quantity: quantity,
                pricePerItem: pricePerItem,
                totalAmount: totalAmount,
                date: Date.now(),
            })
            const vendorTransaction = await InventoryTransactionsByDate.findOne({ vendor: vendorId })
            console.log("vendorTransaction : " + vendorTransaction)
            if (vendorTransaction) {
                const vendorTransactionDateIndex = vendorTransaction.transactions.findIndex((trans) => trans.date === dateNow)
                if (vendorTransactionDateIndex === -1) {
                    vendorTransaction.transactions.push({
                        amountPaid:0,
                        amountToBePaid: totalAmount,
                        date: dateNow
                    })
                }
                else {
                    vendorTransaction.transactions[vendorTransactionDateIndex].amountToBePaid = parseInt(vendorTransaction.transactions[vendorTransactionDateIndex].amountToBePaid) + parseInt(totalAmount)
                }
                
            console.log("Updated VendorTransaction : " + vendorTransaction)
            vendorTransaction.save()
            }
            else {
                await InventoryTransactionsByDate.create({
                    vendor: vendorId,
                    transactions: [{
                        amountToBePaid: totalAmount,
                        amountPaid: 0,
                        date: dateNow
                    }]
                })
            }
            return res.status(201).json(
                {
                    success: "inventory order created!",
                }
            )
        }
    }
    catch (error) {
        next(error)
    }
}
const getInventoryTransactions = async (req, res, next) => {
    try {
        const inventoryTransactionsByDate = await InventoryTransactionsByDate.findOne({ vendor: new ObjectId(req.params.vendorId) }).sort({ date: "desc" }).orFail()
        return res.json(inventoryTransactionsByDate)
    } catch (error) {
        next(error)
    }
}

// const getVendorInventoryOrdersByDate = async (req, res, next) => {
//     try {
//         console.log("inventoryOrdersVendor req: " + req.params.vendorId)
//         const inventoryOrdersVendor = await InventoryOrder.aggregate([
//             {
//                 $match:
//                 {
//                     vendor: new ObjectId(req.params.vendorId)
//                 }
//             },
//             {
//                 $group:
//                 {
//                     _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
//                     totalAmount: { $sum: "$totalAmount" },
//                     count: { $sum: 1 }
//                 }
//             }])
//         console.log("inventoryOrdersVendor: " + inventoryOrdersVendor)
//         return res.status(201).json(inventoryOrdersVendor)
//     } catch (error) {
//         next(error)
//     }
// }
// const getVendorInventoryPaymentsByDate = async (req, res, next) => {
//     try {
//         const inventoryPaymentVendor = await InventoryOrderPayment
//             .findById(req.params.vendorId).aggregate(
//                 [
//                     {
//                         $match:
//                         {
//                             vendor: new ObjectId(req.params.vendorId)
//                         }
//                     },
//                     {
//                         $group:
//                         {
//                             _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
//                             amountPaidTotal: { $sum: "$amountPaid" },
//                             count: { $sum: 1 }
//                         }
//                     }]
//             ).orFail()
//         return res.status(201).json(inventoryPaymentVendor)
//     } catch (error) {
//         next(error)
//     }
// }
const PayVendor = async (req, res, next) => {
    try {
        const vendorId = req.params.vendorId
        const { amountPaid } = req.body
        if (!amountPaid) {
            return res.status(400).send("Enter Amount Paid!")
        }
        else {
            const payVendor = new InventoryOrderPayment({
                vendor: new ObjectId(vendorId),
                amountPaid: amountPaid,
                date: Date.now()
            })
            const dateTimeNow = new Date()
            const dateNow = dateTimeNow.toDateString()
            console.log("dateNow:" +dateNow)
            const vendor = await Vendor.findById(req.params.vendorId).orFail()
            vendor.totalAmountPaid = parseInt(vendor.totalAmountPaid) + parseInt(amountPaid);
            vendor.save();
            const paymentToVendor = await payVendor.save()

            const vendorTransaction = await InventoryTransactionsByDate.findOne({ vendor: vendorId })
            if (vendorTransaction) {
                console.log("Hi there:"+vendorTransaction.transactions[0].date)

                console.log("Hi there:"+vendorTransaction.transactions[0].date.toString() === dateNow.toString())
                const vendorTransactionDateIndex = vendorTransaction.transactions.findIndex((trans) => trans.date === dateNow)
                console.log(vendorTransactionDateIndex)
                if (vendorTransactionDateIndex === -1) {
                    vendorTransaction.transactions.push({
                        amountPaid: amountPaid,
                        amountToBePaid:0,
                        date: dateNow
                    })
                }
                else {
                    console.log("Hi there")
                    vendorTransaction.transactions[vendorTransactionDateIndex].amountPaid = parseInt(vendorTransaction.transactions[vendorTransactionDateIndex].amountPaid) + parseInt(amountPaid)
                }
                vendorTransaction.save()
            }
            else {
                const vendorTransactionCreated = await InventoryTransactionsByDate.create({
                    vendor: vendorId,
                    transactions: [{
                        amountToBePaid: 0,
                        amountPaid: totalAmount,
                        date: dateNow
                    }]
                })
            }
            return res.status(201).json(
                {
                    success: "payment done",
                    paymentDetails: paymentToVendor
                })
        }

    }
    catch (error) {
        next(error)
    }
}
const updateInventoryOrder = async (req, res, next) => {
    try {
        const inventoryOrder = await InventoryOrder.findById(req.params.id).orFail()
        const { ingredient, quantity, pricePerItem, totalAmount, payBeforeDate, expiryDate } =
            req.body;
        inventoryOrder.ingredient = ingredient || inventoryOrder.ingredient
        inventoryOrder.quantity = quantity || inventoryOrder.quantity
        inventoryOrder.pricePerItem = pricePerItem || inventoryOrder.pricePerItem
        inventoryOrder.totalAmount = totalAmount || inventoryOrder.totalAmount
        inventoryOrder.payBeforeDate = payBeforeDate || inventoryOrder.payBeforeDate
        inventoryOrder.expiryDate = expiryDate || inventoryOrder.expiryDate
        await inventoryOrder.save()
        return res.json("inventory Order updated")
    } catch (error) {
        next(error)
    }
}

const deleteInventoryOrder = async (req, res, next) => {
    try {
        const inventoryOrder = await InventoryOrder.findById(req.params.orderId).orFail()
        await Vendor.findById(inventoryOrder.vendor).then((vendor) => {
            console.log("vendor: " + vendor)
            vendor.totalAmount -= parseInt(inventoryOrder.totalAmount);
            vendor.save();
        })
        inventoryOrder.totalAmount
        await inventoryOrder.deleteOne()
        return res.send("inventory Order removed")
    }
    catch (error) {
        next(error)
    }
}
module.exports = { getInventoryOrdersVendor, getInventoryOrderVendor, createNewInventoryOrder, updateInventoryOrder, deleteInventoryOrder, PayVendor, getInventoryTransactions }