const express = require('express')
const router = express.Router()
const { verifyIsLoggedIn, verifyIsAdmin } = require('../middlewares/verifyAuthToken')
const {getUserOrders, getOrder, createOrder,createOrderAdmin, updateOrderToPaid, updateOrderToDelivered,updateOrderToDone, getOrders, getOrderForAnalysis, getFoodOrderTotalByDate} = require("../controllers/foodOrderController")
router.post("/", createOrder);
router.get("/", getUserOrders)
router.get("/user/:orderId", getOrder);
router.get("/admin/bydate", getFoodOrderTotalByDate);

// user routes
router.use(verifyIsLoggedIn)


// admin routes
router.use(verifyIsAdmin)
router.post("/admin", createOrderAdmin);
router.put("/delivered/:id", updateOrderToDelivered);
router.put("/done/:id", updateOrderToDone);
router.put("/paid/:id", updateOrderToPaid);
router.get("/admin", getOrders);
router.get("/analysis/:date", getOrderForAnalysis);

module.exports = router