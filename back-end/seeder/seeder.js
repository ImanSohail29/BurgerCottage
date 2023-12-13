const connectDB = require("../config/db")
connectDB()
const categoryData = require("./categories")
const inventoryOrdersData = require("./inventoryOrders")
const inventoryOrderPaymentsData = require("./inventoryOrderPayments")
const foodItemsData=require("./foodItems")

const Category = require("../models/CategoryModel")
const Ingredient = require("../models/IngredientModel")
const InventoryOrder = require("../models/InventoryOrderModel")
const InventoryOrderPayment = require("../models/InventoryOrderPaymentModel")
const FoodItem=require("../models/FoodItemModel")
const importData = async () => {
    try {
        await Category.collection.dropIndexes()
        await Category.collection.deleteMany({})

        if (process.argv[2] !== "-d") {
            await Category.insertMany(categoryData)  
            console.log("Seeder data processed successfully")
            process.exit()
            return
        }
        console.log("Seeder data deleted successfully")
        process.exit()
    }
    catch (error) {
        console.error("Error while processing seeder data", error)
    }
}
importData()
