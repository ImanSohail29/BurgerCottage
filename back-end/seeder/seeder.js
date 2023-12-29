const connectDB = require("../config/db")
connectDB()
const categoryData = require("./categories")
const userData = require("./users")
const inventoryOrdersData = require("./inventoryOrders")
const inventoryOrderPaymentsData = require("./inventoryOrderPayments")
const foodItemsData=require("./foodItems")
const foodOrdersData=require("./foodOrders")
const vendorsData=require("./vendors")
const addOnsData=require("./addOns")
const vendorTransactionsData=require("./InventoryTransactionsByDate")



const User = require("../models/UserModel")
const Category = require("../models/CategoryModel")
const Ingredient = require("../models/IngredientModel")
const InventoryOrder = require("../models/InventoryOrderModel")
const InventoryOrderPayment = require("../models/InventoryOrderPaymentModel")
const FoodItem=require("../models/FoodItemModel")
const FoodOrder=require("../models/FoodOrderModel")
const Vendor=require("../models/VendorModel")
const AddOn=require("../models/AddOnModel")
const InventoryTransactionsByDate=require("../models/InventoryTransactionsByDate")


const importData = async () => {
    try {
        await FoodOrder.collection.dropIndexes()

        await FoodOrder.collection.deleteMany({})

        if (process.argv[2] !== "-d") {
            await FoodOrder.insertMany(foodOrdersData)  
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
