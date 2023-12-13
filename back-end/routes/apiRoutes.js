const express = require("express")
const app = express()
const vendorRoutes=require("./vendorRoutes")
const inventoryOrderRoutes=require("./inventoryOrderRoutes")
const categoryRoutes=require("./categoryRoutes")
const foodItemRoutes=require("./foodItemRoutes")


app.use("/vendors", vendorRoutes)
app.use("/inventoryOrders", inventoryOrderRoutes)
app.use("/categories",categoryRoutes)
app.use("/foodItems",foodItemRoutes)

module.exports = app