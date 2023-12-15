const express = require("express")
const app = express()
const vendorRoutes=require("./vendorRoutes")
const inventoryOrderRoutes=require("./inventoryOrderRoutes")
const categoryRoutes=require("./categoryRoutes")
const foodItemRoutes=require("./foodItemRoutes")
const userRoutes=require("./userRoutes")

const jwt = require("jsonwebtoken");

app.get("/logout", (req, res) => {
  return res.clearCookie("access_token").send("access token cleared");
});

app.get("/get-token", (req, res) => {
    try {
        const accessToken = req.cookies["access_token"];
        console.log(accessToken)
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
        return res.json({ token: decoded.name, isAdmin: decoded.isAdmin });
    } catch (err) {
        return res.status(401).send("Unauthorized. Invalid Token");
    }
})


app.use("/vendors", vendorRoutes)
app.use("/inventoryOrders", inventoryOrderRoutes)
app.use("/categories",categoryRoutes)
app.use("/foodItems",foodItemRoutes)
app.use("/users",userRoutes)


module.exports = app