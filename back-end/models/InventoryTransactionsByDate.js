const mongoose = require("mongoose")
const Vendor = require("./VendorModel")

const InventoryTransactionSchema = mongoose.Schema({
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: Vendor, required: true },
    transactions: [{
        amountPaid: { type: Number, required: true },
        amountToBePaid: { type: Number, required: true },
        date: { type: String }
    }]

})
const InventoryTransactionByDate = mongoose.model("InventoryTransaction", InventoryTransactionSchema)
module.exports = InventoryTransactionByDate;