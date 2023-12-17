const express = require('express')
const router = express.Router()
const { verifyIsLoggedIn, verifyIsAdmin } = require('../middlewares/verifyAuthToken')
const {getUserOrders, getOrder, createOrder, updateOrderToPaid, updateOrderToDelivered, getOrders, getOrderForAnalysis} = require("../controllers/foodOrderController")

// user routes
router.use(verifyIsLoggedIn)
router.get("/", getUserOrders)
router.get("/user/:orderId", getOrder);
router.post("/", createOrder);
router.put("/paid/:id", updateOrderToPaid);

// admin routes
router.use(verifyIsAdmin)
router.put("/delivered/:id", updateOrderToDelivered);
router.get("/admin", getOrders);
router.get("/analysis/:date", getOrderForAnalysis);

module.exports = router