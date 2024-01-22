const dotenv=require("dotenv").config()
console.log(process.env.TWILIO_ACCOUNT_SID)
if(dotenv.error){
    console.log("Error",dotenv.error)
}
const Order = require("../models/FoodOrderModel");
const Product = require("../models/FoodItemModel");
const FoodOrder = require("../models/FoodOrderModel");
const Report = require("../models/ReportModel");
const ObjectId = require("mongodb").ObjectId;
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)
const sendSMS = async (body) => {
    let msgOptions = {
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.TWILIO_TO_PHONE_NUMBER,
        body
    }
    try {
        const message=await client.messages.create(msgOptions)
        console.log("message: "+message)
    }
    catch (err) {
        console.log(err)
    }
}
function replaceCharacter(str, index, replacement) {
    let strLength=str.length
    str=str.slice(1, strLength)
    return (
      replacement+str
    );
  }
  
const sendSMSToCustomer = async (phoneNumber,body) => {
    if(phoneNumber[0]!="+")
    {
        console.log(phoneNumber[0])
        phoneNumber=replaceCharacter(phoneNumber, 0, '+92');
    }
    console.log('whatsapp:'+phoneNumber)
    console.log(process.env.TWILIO_USER_PHONE_NUMBER)
    let msgOptions = {
        from: process.env.TWILIO_PHONE_NUMBER,
        to: 'whatsapp:'+phoneNumber,
        body
    }
    try {
        const message=await client.messages.create(msgOptions)
        console.log("message: "+message)
    }
    catch (err) {
        console.log(err)
    }
}
const getUserOrders = async (req, res, next) => {
    try {
        console.log("req.user._id: " + req.user._id)
        const orders = await Order.find({ user: new ObjectId(req.user._id) });
        console.log(orders)
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
    console.log("inside createOrder")
    try {
        console.log("req.body: " + JSON.stringify(req.body))
        const { cart, orderTotal, paymentMethod, customerInfo, customerId, serviceMode, discount } = req.body;
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
            const dateTimeNow = new Date()
            const dateNow = dateTimeNow.toDateString()
            console.log("dateNow : " + dateNow)
            let dateTimeYesterday = new Date();
            dateTimeYesterday.setDate(dateTimeYesterday.getDate() - 1);
            const dateYesterday = dateTimeYesterday.toDateString()
            console.log(req.user._id)
            console.log(req.user.name)
            const order = new Order({
                user: req.user._id,
                customerInfo: customerInfo,
                orderTotal: orderTotal,
                cart: cart,
                paymentMethod: paymentMethod,
                serviceMode: serviceMode,
                discount: discount
            })
            const createdOrder = await order.save();
            let cartItems=[]
            for(var i=0;i<cart.cartItems.length;i++){
                cartItems.push({
                    name:cart.cartItems[i].name,
                    size:cart.cartItems[i].size,
                    quantity:cart.cartItems[i].quantity,
                    AddOns:cart.cartItems[i].selectedAddOns,
                })
            }
            sendSMS("Customer Info: "+JSON.stringify(order.customerInfo)+"\n\n"+"Cart Items: "+JSON.stringify(cartItems)+" "+"Total number of items: "+cart.itemsCount+"  "+"Subtotal: "+cart.cartSubtotal+"  service mode: "+order.serviceMode+"  Payment Method: "+order.paymentMethod)
            const todaysReport = await Report.findOne({ date: dateNow })
            const yesterdaysReport = await Report.findOne({ date: dateYesterday })

            console.log("todaysReport : " + todaysReport)
            console.log("yesterdayReport : " + yesterdaysReport)
            let previousProfit = 0
            if (yesterdaysReport) {
                previousProfit = yesterdaysReport.totalProfit
            }
            if (todaysReport) {
                todaysReport.totalSale = parseInt(todaysReport.totalSale) + parseInt(orderTotal.cartSubtotal)
                todaysReport.profit = parseInt(todaysReport.profit) + parseInt(orderTotal.cartSubtotal)
                todaysReport.totalProfit = previousProfit + todaysReport.profit
                todaysReport.save()

            }
            else {
                let todaysProfit = 0 + orderTotal.cartSubtotal
                await Report.create({
                    date: dateNow,
                    totalExpenses: 0,
                    totalSale: orderTotal.cartSubtotal,
                    profit: todaysProfit,
                    totalProfit: previousProfit + todaysProfit
                })
            }
            console.log("Updated todays Report Created : " + todaysReport)
            res.status(201).send(createdOrder);
        }
        else {
            const dateTimeNow = new Date()
            const dateNow = dateTimeNow.toDateString()
            console.log("dateNow : " + dateNow)
            let dateTimeYesterday = new Date();
            dateTimeYesterday.setDate(dateTimeYesterday.getDate() - 1);
            const dateYesterday = dateTimeYesterday.toDateString()
            const order = new Order({
                user: new ObjectId(customerId),
                customerInfo: customerInfo,
                orderTotal: orderTotal,
                cart: cart,
                paymentMethod: paymentMethod,
                serviceMode: serviceMode,
                discount: discount
            })
            const createdOrder = await order.save();
            let cartItems=[]
            for(var i=0;i<cart.cartItems.length;i++){
                cartItems.push({
                    name:cart.cartItems[i].name,
                    size:cart.cartItems[i].size,
                    quantity:cart.cartItems[i].quantity,
                    AddOns:cart.cartItems[i].selectedAddOns,
                })
            }
            sendSMS("Customer Info: "+JSON.stringify(order.customerInfo)+"\n\n"+"Cart Items: "+JSON.stringify(cartItems)+" "+"Total number of items: "+cart.itemsCount+"  "+"Subtotal: "+cart.cartSubtotal+"  service mode: "+order.serviceMode+"  Payment Method: "+order.paymentMethod)
            const todaysReport = await Report.findOne({ date: dateNow })
            const yesterdaysReport = await Report.findOne({ date: dateYesterday })

            console.log("todaysReport : " + todaysReport)
            console.log("yesterdayReport : " + yesterdaysReport)
            let previousProfit = 0
            if (yesterdaysReport) {
                previousProfit = yesterdaysReport.totalProfit
            }
            if (todaysReport) {
                todaysReport.totalSale = parseInt(todaysReport.totalSale) + parseInt(orderTotal.cartSubtotal)
                todaysReport.profit = parseInt(todaysReport.profit) + parseInt(orderTotal.cartSubtotal)
                todaysReport.totalProfit = previousProfit + todaysReport.profit
                todaysReport.save()

            }
            else {
                let todaysProfit = 0 + orderTotal.cartSubtotal
                await Report.create({
                    date: dateNow,
                    totalExpenses: 0,
                    totalSale: orderTotal.cartSubtotal,
                    profit: todaysProfit,
                    totalProfit: previousProfit + todaysProfit
                })
            }
            console.log("Updated todays Report Created : " + todaysReport)
            res.status(201).send(createdOrder);
        }


    } catch (err) {
        next(err)
    }
}
const createOrderCustomer = async (req, res, next) => {
    console.log("inside create order customer")
    try {
        console.log("req.body: " + JSON.stringify(req.body))
        console.log("req.user: " + JSON.stringify(req.user))
        const { cart, orderTotal, paymentMethod, customerInfo, customerId, serviceMode, discount } = req.body;
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
            const dateTimeNow = new Date()
            const dateNow = dateTimeNow.toDateString()
            console.log("dateNow : " + dateNow)
            let dateTimeYesterday = new Date();
            dateTimeYesterday.setDate(dateTimeYesterday.getDate() - 1);
            const dateYesterday = dateTimeYesterday.toDateString()
            console.log(req.user._id)
            console.log(req.user.name)
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
            let cartItems=[]
            for(var i=0;i<cart.cartItems.length;i++){
                cartItems.push({
                    name:cart.cartItems[i].name,
                    size:cart.cartItems[i].size,
                    quantity:cart.cartItems[i].quantity,
                    AddOns:cart.cartItems[i].selectedAddOns,
                })
            }
            sendSMS("Customer Info: "+JSON.stringify(order.customerInfo)+"\n\n"+"Cart Items: "+JSON.stringify(cartItems)+" "+"Total number of items: "+cart.itemsCount+"  "+"Subtotal: "+cart.cartSubtotal+"  service mode: "+order.serviceMode+"  Payment Method: "+order.paymentMethod)
            const todaysReport = await Report.findOne({ date: dateNow })
            const yesterdaysReport = await Report.findOne({ date: dateYesterday })

            console.log("todaysReport : " + todaysReport)
            console.log("yesterdayReport : " + yesterdaysReport)
            let previousProfit = 0
            if (yesterdaysReport) {
                previousProfit = yesterdaysReport.totalProfit
            }
            if (todaysReport) {
                todaysReport.totalSale = parseInt(todaysReport.totalSale) + parseInt(orderTotal.cartSubtotal)
                todaysReport.profit = parseInt(todaysReport.profit) + parseInt(orderTotal.cartSubtotal)
                todaysReport.totalProfit = previousProfit + todaysReport.profit
                todaysReport.save()

            }
            else {
                let todaysProfit = 0 + orderTotal.cartSubtotal
                await Report.create({
                    date: dateNow,
                    totalExpenses: 0,
                    totalSale: orderTotal.cartSubtotal,
                    profit: todaysProfit,
                    totalProfit: previousProfit + todaysProfit
                })
            }
            console.log("Updated todays Report Created : " + todaysReport)
            res.status(201).send(createdOrder);
        }
        else {
            const dateTimeNow = new Date()
            const dateNow = dateTimeNow.toDateString()
            console.log("dateNow : " + dateNow)
            let dateTimeYesterday = new Date();
            dateTimeYesterday.setDate(dateTimeYesterday.getDate() - 1);
            const dateYesterday = dateTimeYesterday.toDateString()
            const order = new Order({
                user: new ObjectId(customerId),
                customerInfo: customerInfo,
                orderTotal: orderTotal,
                cart: cart,
                paymentMethod: paymentMethod,
                serviceMode: serviceMode,
                discount: discount
            })
            const createdOrder = await order.save();
            let cartItems=[]
            for(var i=0;i<cart.cartItems.length;i++){
                cartItems.push({
                    name:cart.cartItems[i].name,
                    size:cart.cartItems[i].size,
                    quantity:cart.cartItems[i].quantity,
                    AddOns:cart.cartItems[i].selectedAddOns,
                })
            }
            sendSMS("Customer Info: "+JSON.stringify(order.customerInfo)+"\n\n"+"Cart Items: "+JSON.stringify(cartItems)+" "+"Total number of items: "+cart.itemsCount+"  "+"Subtotal: "+cart.cartSubtotal+"  service mode: "+order.serviceMode+"  Payment Method: "+order.paymentMethod)

            const todaysReport = await Report.findOne({ date: dateNow })
            const yesterdaysReport = await Report.findOne({ date: dateYesterday })

            console.log("todaysReport : " + todaysReport)
            console.log("yesterdayReport : " + yesterdaysReport)
            let previousProfit = 0
            if (yesterdaysReport) {
                previousProfit = yesterdaysReport.totalProfit
            }
            if (todaysReport) {
                todaysReport.totalSale = parseInt(todaysReport.totalSale) + parseInt(orderTotal.cartSubtotal)
                todaysReport.profit = parseInt(todaysReport.profit) + parseInt(orderTotal.cartSubtotal)
                todaysReport.totalProfit = previousProfit + todaysReport.profit
                todaysReport.save()

            }
            else {
                let todaysProfit = 0 + orderTotal.cartSubtotal
                await Report.create({
                    date: dateNow,
                    totalExpenses: 0,
                    totalSale: orderTotal.cartSubtotal,
                    profit: todaysProfit,
                    totalProfit: previousProfit + todaysProfit
                })
            }
            console.log("Updated todays Report Created : " + todaysReport)
            res.status(201).send(createdOrder);
        }


    } catch (err) {
        next(err)
    }
}
const createOrderAdmin = async (req, res, next) => {
    console.log("inside createOrderAdmin")
    try {
        console.log("req.body: " + JSON.stringify(req.body))
        console.log("req.user: " + JSON.stringify(req.user))
        const { cart, orderTotal, paymentMethod, customerInfo, customerId, serviceMode, discount } = req.body;
        console.log("req.body: " + req.body)
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
            const dateTimeNow = new Date()
            const dateNow = dateTimeNow.toDateString()
            console.log("dateNow : " + dateNow)
            let dateTimeYesterday = new Date();
            dateTimeYesterday.setDate(dateTimeYesterday.getDate() - 1);
            const dateYesterday = dateTimeYesterday.toDateString()
            const order = new Order({
                user: new ObjectId(customerId),
                customerInfo: customerInfo,
                orderTotal: orderTotal,
                cart: cart,
                paymentMethod: paymentMethod,
                serviceMode: serviceMode,
                discount: discount
            })
            const createdOrder = await order.save();

            const todaysReport = await Report.findOne({ date: dateNow })
            const yesterdaysReport = await Report.findOne({ date: dateYesterday })

            console.log("todaysReport : " + todaysReport)
            console.log("yesterdayReport : " + yesterdaysReport)
            let previousProfit = 0
            if (yesterdaysReport) {
                previousProfit = yesterdaysReport.totalProfit
            }
            if (todaysReport) {
                todaysReport.totalSale = parseInt(todaysReport.totalSale) + parseInt(orderTotal.cartSubtotal)
                todaysReport.profit = parseInt(todaysReport.profit) + parseInt(orderTotal.cartSubtotal)
                todaysReport.totalProfit = previousProfit + todaysReport.profit
                todaysReport.save()

            }
            else {
                let todaysProfit = 0 + orderTotal.cartSubtotal
                await Report.create({
                    date: dateNow,
                    totalExpenses: 0,
                    totalSale: orderTotal.cartSubtotal,
                    profit: todaysProfit,
                    totalProfit: previousProfit + todaysProfit
                })
            }
            console.log("Updated todays Report Created : " + todaysReport)
            console.log(JSON.stringify(createdOrder))
            res.status(201).send(createdOrder);
        }
        else {
            const dateTimeNow = new Date()
            const dateNow = dateTimeNow.toDateString()
            console.log("dateNow : " + dateNow)
            let dateTimeYesterday = new Date();
            dateTimeYesterday.setDate(dateTimeYesterday.getDate() - 1);
            const dateYesterday = dateTimeYesterday.toDateString()
            const order = new Order({
                user: customerId,
                customerInfo: customerInfo,
                orderTotal: orderTotal,
                cart: cart,
                paymentMethod: paymentMethod,
                serviceMode: serviceMode,
                discount: discount
            })
            const createdOrder = await order.save();

            const todaysReport = await Report.findOne({ date: dateNow })
            const yesterdaysReport = await Report.findOne({ date: dateYesterday })

            console.log("todaysReport : " + todaysReport)
            console.log("yesterdayReport : " + yesterdaysReport)
            let previousProfit = 0
            if (yesterdaysReport) {
                previousProfit = yesterdaysReport.totalProfit
            }
            if (todaysReport) {
                todaysReport.totalSale = parseInt(todaysReport.totalSale) + parseInt(orderTotal.cartSubtotal)
                todaysReport.profit = parseInt(todaysReport.profit) + parseInt(orderTotal.cartSubtotal)
                todaysReport.totalProfit = previousProfit + todaysReport.profit
                todaysReport.save()

            }
            else {
                let todaysProfit = 0 + orderTotal.cartSubtotal
                await Report.create({
                    date: dateNow,
                    totalExpenses: 0,
                    totalSale: orderTotal.cartSubtotal,
                    profit: todaysProfit,
                    totalProfit: previousProfit + todaysProfit
                })
            }
            console.log("Updated todays Report Created : " + todaysReport)
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
const updateOrderToConfirmed = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).orFail();
        order.isConfirmed = true;
        const updatedOrder = await order.save();
        sendSMSToCustomer(order.customerInfo.phoneNumber,"Order has been confirmed and will be delivered in 30 mins")
        res.send(updatedOrder);
    } catch (err) {
        next(err);
    }
}
const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({}).populate("user", "-password").sort({ createdAt: "desc" });
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
module.exports = { getUserOrders, getOrder, createOrder, createOrderAdmin, createOrderCustomer, updateOrderToPaid, updateOrderToDelivered, updateOrderToDone,updateOrderToConfirmed, getOrders, getOrderForAnalysis, getFoodOrderTotalByDate }