const connectDB = require("../config/db")
connectDB()
const categoryData = require("./categories")
const userData = require("./users")
const inventoryOrdersData = require("./inventoryOrders")
const inventoryOrderPaymentsData = require("./inventoryOrderPayments")
const foodItemsData = require("./foodItems")
const foodOrdersData = require("./foodOrders")
const vendorsData = require("./vendors")
const addOnsData = require("./addOns")
const vendorTransactionsData = require("./InventoryTransactionsByDate")
const InventoryTransactionsByDateData = require("./InventoryTransactionsByDate")

const reportData = require("./report")
const expensesData = require("./expenses")




const User = require("../models/UserModel")
const Category = require("../models/CategoryModel")
const Ingredient = require("../models/IngredientModel")
const InventoryOrder = require("../models/InventoryOrderModel")
const InventoryOrderPayment = require("../models/InventoryOrderPaymentModel")
const FoodItem = require("../models/FoodItemModel")
const FoodOrder = require("../models/FoodOrderModel")
const Vendor = require("../models/VendorModel")
const AddOn = require("../models/AddOnModel")
const InventoryTransactionsByDate = require("../models/InventoryTransactionsByDate")
const Report = require("../models/ReportModel")
const Expenses = require("../models/ExpensesModel")
const foodOrders = require("../models/FoodOrderModel")



const importData = async () => {
    try {
        await Report.collection.dropIndexes()
        await Expenses.collection.dropIndexes()
        await foodOrders.collection.dropIndexes()
        await InventoryOrderPayment.collection.dropIndexes()
        await InventoryOrder.collection.dropIndexes()
        await InventoryTransactionsByDate.collection.dropIndexes()
        await User.collection.dropIndexes()
        await Vendor.collection.dropIndexes()


        await Report.collection.deleteMany({})
        await Expenses.collection.deleteMany({})
        await foodOrders.collection.deleteMany({})
        await InventoryOrderPayment.collection.deleteMany({})
        await InventoryOrder.collection.deleteMany({})
        await InventoryTransactionsByDate.collection.deleteMany({})
        await User.collection.deleteMany({})
        await Vendor.collection.deleteMany({})


        if (process.argv[2] !== "-d") {
            await Report.insertMany(reportData)
            await Expenses.insertMany(expensesData)
            await foodOrders.insertMany(foodOrdersData)
            await InventoryOrderPayment.insertMany(inventoryOrderPaymentsData)
            await InventoryOrder.insertMany(inventoryOrdersData)
            await InventoryTransactionsByDate.insertMany(InventoryTransactionsByDateData)
            await User.insertMany(userData)
            await Vendor.insertMany(vendorsData)

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
