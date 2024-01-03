const express = require('express')
const router = express.Router()
const { verifyIsLoggedIn, verifyIsAdmin } = require('../middlewares/verifyAuthToken')
const {getUserOrders, getOrder, createOrder, updateOrderToPaid, updateOrderToDelivered, getOrders, getOrderForAnalysis} = require("../controllers/foodOrderController")
router.post("/", createOrder);
router.get("/", getUserOrders)
router.put("/paid/:id", updateOrderToPaid);
router.get("/user/:orderId", getOrder);

// user routes
router.use(verifyIsLoggedIn)


// admin routes
router.use(verifyIsAdmin)
router.put("/delivered/:id", updateOrderToDelivered);
router.get("/admin", getOrders);
router.get("/analysis/:date", getOrderForAnalysis);

module.exports = router