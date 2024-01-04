const Order = require("../models/FoodOrderModel");
const Product = require("../models/FoodItemModel");
const FoodOrder = require("../models/FoodOrderModel");
const ObjectId = require("mongodb").ObjectId;

const getUserOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: ObjectId(req.user._id) });
        res.send(orders);
    } catch (error) {
        next(error)
    }
}

const getOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.orderId).populate("user", "-password -isAdmin -_id -__v -createdAt -updatedAt").orFail();
        order.orderPlacedAt.toLocaleTimeString();
        res.send(order);
    } catch (err) {
        next(err)
    }
}

const createOrder = async (req, res, next) => {
    try {
        console.log(req.body)
        const { cart, orderTotal, paymentMethod, customerInfo, serviceMode, discount } = req.body;
        if (!cart || !orderTotal || !paymentMethod) {
            return res.status(400).send("All inputs are required");
        }

        // let ids = cartItems.map((item) => {
        //     return item.productID;
        // })
        // let qty = cartItems.map((item) => {
        //     return Number(item.quantity);
        // })

        // await Product.find({ _id: { $in: ids } }).then((products) => {
        //     products.forEach(function (product, idx) {
        //         product.sales += qty[idx];
        //         product.save();
        //     })
        // })
        if (req.user) {
            const order = new Order({
                user: new ObjectId(req.user._id),
                customerInfo: customerInfo,
                orderTotal: orderTotal,
                cart: cart,
                paymentMethod: paymentMethod,
                serviceMode: serviceMode,
                discount: discount
            })
            const createdOrder = await order.save();
            res.status(201).send(createdOrder);
        }
        else {
            const order = new Order({
                user: new ObjectId(customerInfo._id),
                customerInfo: customerInfo,
                orderTotal: orderTotal,
                cart: cart,
                paymentMethod: paymentMethod,
                serviceMode: serviceMode,
                discount: discount
            })
            const createdOrder = await order.save();
            res.status(201).send(createdOrder);
        }


    } catch (err) {
        next(err)
    }
}

const updateOrderToPaid = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).orFail();
        order.isPaid = true;
        order.paidAt = Date.now();

        const updatedOrder = await order.save();
        res.send(updatedOrder);

    } catch (err) {
        next(err);
    }
}

const updateOrderToDelivered = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).orFail();
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.send(updatedOrder);
    } catch (err) {
        next(err);
    }
}
const updateOrderToDone = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).orFail();
        order.isDone = true;
        order.readyAt = Date.now();
        const updatedOrder = await order.save();
        res.send(updatedOrder);
    } catch (err) {
        next(err);
    }
}

const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({}).populate("user", "-password").sort({ paymentMethod: "desc" });
        res.send(orders);
    } catch (err) {
        next(err)
    }
}

const getOrderForAnalysis = async (req, res, next) => {
    try {
        const start = new Date(req.params.date);
        start.setHours(0, 0, 0, 0);
        const end = new Date(req.params.date);
        end.setHours(23, 59, 59, 999);

        const order = await Order.find({
            createdAt: {
                $gte: start,
                $lte: end,
            }
        }).sort({ createdAt: "asc" });
        res.send(order);

    } catch (err) {
        next(err)
    }
}
const getFoodOrderTotalByDate = async (req, res, next) => {
    try {
                const foodOrdersByDate = await Order.aggregate([
                            {
                                $group:
                                {
                                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderPlacedAt" } },
                                    amountPaidTotal: { $sum: "$orderTotal.cartSubtotal" },
                                    count: { $sum: 1 }
                                }
                            }
                        ]
                    )
                return res.status(201).json(foodOrdersByDate)
            } catch (error) {
                next(error)
            }
}
module.exports = { getUserOrders, getOrder, createOrder, updateOrderToPaid, updateOrderToDelivered,updateOrderToDone, getOrders, getOrderForAnalysis,getFoodOrderTotalByDate }