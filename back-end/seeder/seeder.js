const connectDB = require("../config/db")
connectDB()
const categoryData = require("./categories")
const userData = require("./users")
const inventoryOrdersData = require("./inventoryOrders")
const inventoryOrderPaymentsData = require("./inventoryOrderPayments")
const foodItemsData=require("./foodItems")

const User = require("../models/CustomerModel")
const Category = require("../models/CategoryModel")
const Ingredient = require("../models/IngredientModel")
const InventoryOrder = require("../models/InventoryOrderModel")
const InventoryOrderPayment = require("../models/InventoryOrderPaymentModel")
const FoodItem=require("../models/FoodItemModel")
const importData = async () => {
    try {
        await User.collection.dropIndexes()
        await User.collection.deleteMany({})

        if (process.argv[2] !== "-d") {
            await User.insertMany(userData)  
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
