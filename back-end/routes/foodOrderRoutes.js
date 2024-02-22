const express = require('express')
const router = express.Router()
const { verifyIsLoggedIn, verifyIsAdmin } = require('../middlewares/verifyAuthToken')
const {getUserOrders, getOrder,getOrdersAsc, createOrder,createOrderAdmin,createOrderCustomer, updateOrderToPaid, updateOrderToDelivered,updateOrderToDone, getOrders, getOrderForAnalysis, getFoodOrderTotalByDate, updateOrderToConfirmed} = require("../controllers/foodOrderController")
router.post("/", createOrder);
router.get("/user/:orderId", getOrder);
router.get("/admin/bydate", getFoodOrderTotalByDate);

// user routes
router.use(verifyIsLoggedIn)
router.post("/customer", createOrderCustomer);
router.get("/", getUserOrders)

// admin routes
router.use(verifyIsAdmin)
router.post("/admin", createOrderAdmin);
router.put("/delivered/:id", updateOrderToDelivered);
router.put("/done/:id", updateOrderToDone);
router.put("/paid/:id", updateOrderToPaid);
router.put("/confirm/:id", updateOrderToConfirmed);
router.get("/admin", getOrders);
router.get("/admin/asc", getOrdersAsc);
router.get("/admin/analysis/:date", getOrderForAnalysis);

module.exports = router