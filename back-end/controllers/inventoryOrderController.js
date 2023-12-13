const Vendor = require("../models/VendorModel")
const ObjectId = require("mongodb").ObjectId

const InventoryOrder = require("../models/InventoryOrderModel")

const InventoryOrderPayment = require("../models/InventoryOrderPaymentModel")
const getInventoryOrdersVendor = async (req, res, next) => {
    try {
        const inventoryOrdersVendor = await InventoryOrder.find({ vendor:new ObjectId(req.params.vendorId) }).orFail()
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
        const vendorId = req.params.vendorId
        const { ingredientId, quantity, pricePerItem, totalAmount, expiryDate } = req.body
        if (!(ingredientName && quantity && totalAmount)) {
            return res.status(400).send("Enter all required Inputs!")
        }
        else {
            await Vendor.find({ vendor: ObjectId(vendorId) }).then((vendor) => {

                vendor.RemainingAmount += totalAmount;
                vendor.save();
            })

            await InventoryOrder.create({
                vendor: ObjectId(vendorId),
                ingredient: ObjectId(ingredientId),
                quantity: quantity,
                pricePerItem: pricePerItem,
                totalAmount: totalAmount,
                expiryDate: expiryDate,
                date: Date.now(),
            })
            return res.status(201).json(
                {
                    success: "inventory Order created!",
                }
            )
        }
    }
    catch (error) {
        next(error)
    }
}
const getVendorInventoryOrdersByDate=async(req,res,next)=>{
    try {
        const inventoryOrdersVendor = await InventoryOrder.find({ vendor: ObjectId(req.params.vendorId) }).aggregate(
            [{$group:
                {
                _id:{date:"$date"} ,
                totalAmount:{$sum:"$totalAmount"},
                count:{$sum:1}
                }
            }]
        ).orFail()
        return res.status(201).json(inventoryOrdersVendor)
    } catch (error) {
        next(error)
    }
}
const getVendorInventoryPaymentByDate=async(req,res,next)=>{
    try {
        const inventoryPaymentVendor = await InventoryOrderPayment.find({ vendor: ObjectId(req.params.vendorId) }).aggregate(
            [{$group:
                {
                _id:{date:"$date"} ,
                totalAmount:{$sum:"$amountPaid"},
                count:{$sum:1}
                }
            }]
        ).orFail()
        return res.status(201).json(inventoryPaymentVendor)
    } catch (error) {
        next(error)
    }
}
const PayVendor = async (req, res, next) => {
    try {
        const vendorId = req.params.vendorId
        const { amountPaid } = req.body
        if (!amountPaid) {
            return res.status(400).send("Enter Amount Paid!")
        }
        else {
            const payVendor = new InventoryOrderPayment({
                vendor: ObjectId(vendorId),
                amountPaid: amountPaid,
                date: Date.now()
            })

            await Vendor.find({ vendor: ObjectId(vendorId) }).then((vendor) => {

                vendor.RemainingAmount -= amountPaid;
                vendor.save();
            })
            const paymentToVendor = await payVendor.save()
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
        const inventoryOrder = await InventoryOrder.findById(req.params.id).orFail()
        await inventoryOrder.deleteOne()
        return res.send("inventory Order removed")
    }
    catch (error) {
        next(error)
    }
}
module.exports = { getInventoryOrdersVendor, getInventoryOrderVendor, createNewInventoryOrder, updateInventoryOrder, getVendorInventoryOrdersByDate,getVendorInventoryPaymentByDate,deleteInventoryOrder, PayVendor }