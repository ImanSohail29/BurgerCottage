const Stock = require("../models/StockModel")

const getStocks = async (req, res, next) => {
    try {
        const stocks = await Stock.find({}).orFail()
        return res.json(stocks)
    }
    catch (error) {
      return null
      next(error)
    }
    res.send("Handling stock routes, e.g. search for stock")
}
const getStockById = async (req, res, next) => {
    try {
      console.log(req.params.stockId)
      const stock = await Stock.findById(req.params.stockId)
        .orFail();
      return res.json(stock);
    } catch (err) {
      next(err);
    }
  };
const newStock = async (req, res, next) => {
    try {
        //res.send(!!req.body)
        const { name,quantity,inStock } = req.body
        console.log("stock:" + name)
        if (!name) {
            res.status(400).send("Stock input is required")
        }
        const stockExists = await Stock.findOne({ name: name })

        if (stockExists) {
            res.status(400).send("Stock already exists")
        }
        else {
            const stockCreated = await Stock.create({
                name: name,
                inStock:inStock,
                quantity:quantity,
            })
            res.json({
                message: "stock created",
                stockCreated: stockCreated
            })
        }
    }
    catch (err) {
        next(err)
    }
}
const adminUpdateStock = async (req, res, next) => {
    try {
      const stock = await Stock.findById(req.params.stockId).orFail();
      const {name,quantity,inStock } =req.body;
      console.log("stock: "+inStock)
      stock.name = name || stock.name;
      stock.quantity = quantity || stock.quantity;
      stock.inStock = inStock;
      await stock.save();
      res.json({
        message: "stock updated",
      });
    } catch (err) {
      next(err);
    }
  };
const deleteStock = async (req, res, next) => {
    try {
        const stock = await Stock.findById(req.params.stockId).orFail();
        await stock.deleteOne();
        res.json({ message: "stock removed" });
      } catch (err) {
        next(err);
      }

};

module.exports = { getStocks,getStockById, newStock, deleteStock,adminUpdateStock }