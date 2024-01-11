const express = require('express')
const router = express.Router()
const { verifyIsLoggedIn, verifyIsAdmin } = require('../middlewares/verifyAuthToken')
const {getUserOrders, getOrder, createOrder,createOrderAdmin,createOrderCustomer, updateOrderToPaid, updateOrderToDelivered,updateOrderToDone, getOrders, getOrderForAnalysis, getFoodOrderTotalByDate} = require("../controllers/foodOrderController")
router.post("/", createOrder);
router.get("/admin/bydate", getFoodOrderTotalByDate);

// user routes
router.use(verifyIsLoggedIn)
router.post("/customer", createOrderCustomer);
router.get("/", getUserOrders)
router.get("/user/:orderId", getOrder);

// admin routes
router.use(verifyIsAdmin)
router.post("/admin", createOrderAdmin);
router.put("/delivered/:id", updateOrderToDelivered);
router.put("/done/:id", updateOrderToDone);
router.put("/paid/:id", updateOrderToPaid);
router.get("/admin", getOrders);
router.get("/analysis/:date", getOrderForAnalysis);

module.exports = router