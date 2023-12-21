const connectDB = require("../config/db")
connectDB()
const categoryData = require("./categories")
const userData = require("./users")
const inventoryOrdersData = require("./inventoryOrders")
const inventoryOrderPaymentsData = require("./inventoryOrderPayments")
const foodItemsData=require("./foodItems")
const foodOrdersData=require("./foodOrders")
const vendorsData=require("./vendors")
const vendorTransactionsData=require("./InventoryTransactionsByDate")



const User = require("../models/UserModel")
const Category = require("../models/CategoryModel")
const Ingredient = require("../models/IngredientModel")
const InventoryOrder = require("../models/InventoryOrderModel")
const InventoryOrderPayment = require("../models/InventoryOrderPaymentModel")
const FoodItem=require("../models/FoodItemModel")
const FoodOrder=require("../models/FoodOrderModel")
const Vendor=require("../models/VendorModel")
const InventoryTransactionsByDate=require("../models/InventoryTransactionsByDate")


const importData = async () => {
    try {
        await InventoryTransactionsByDate.collection.dropIndexes()

        await InventoryTransactionsByDate.collection.deleteMany({})

        if (process.argv[2] !== "-d") {
            await InventoryTransactionsByDate.insertMany(vendorTransactionsData)  
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
