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
const ingredientsData = require("./ingredients")
const reportData = require("./report")
const expensesData = require("./expenses")
const stockData=require("./stocks")




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
const Stocks = require("../models/StockModel")
const Stock = require("../models/StockModel")



const importData = async () => {
    try {
        // await AddOn.collection.dropIndexes()
        // await Category.collection.dropIndexes()
        // await Expenses.collection.dropIndexes()
        // await FoodItem.collection.dropIndexes()
        // await foodOrders.collection.dropIndexes()
        // await Ingredient.collection.dropIndexes()
        // await InventoryOrderPayment.collection.dropIndexes()
        // await InventoryOrder.collection.dropIndexes()
        // await InventoryTransactionsByDate.collection.dropIndexes()
        // await Report.collection.dropIndexes()
        // await User.collection.dropIndexes()
        // await Vendor.collection.dropIndexes()
        await Stock.collection.dropIndexes()


        // await AddOn.collection.deleteMany({})
        // await Category.collection.deleteMany({})
        // await Expenses.collection.deleteMany({})
        // await FoodItem.collection.deleteMany({})
        // await foodOrders.collection.deleteMany({})
        // await Ingredient.collection.deleteMany({})
        // await InventoryOrderPayment.collection.deleteMany({})
        // await InventoryOrder.collection.deleteMany({})
        // await InventoryTransactionsByDate.collection.deleteMany({})
        // await Report.collection.deleteMany({})
        // await User.collection.deleteMany({})
        // await Vendor.collection.deleteMany({})
        await Stock.collection.deleteMany({})


        if (process.argv[2] !== "-d") {
            // await AddOn.insertMany(addOnsData)
            // await Category.insertMany(categoryData)
            // await Expenses.insertMany(expensesData)
            // await FoodItem.insertMany(foodItemsData)
            // await foodOrders.insertMany(foodOrdersData)
            // await Ingredient.insertMany(ingredientsData)
            // await InventoryOrderPayment.insertMany(inventoryOrderPaymentsData)
            // await InventoryOrder.insertMany(inventoryOrdersData)
            // await InventoryTransactionsByDate.insertMany(InventoryTransactionsByDateData)
            // await Report.insertMany(reportData)
            // await User.insertMany(userData)
            // await Vendor.insertMany(vendorsData)
            await Stock.insertMany(stockData)

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
