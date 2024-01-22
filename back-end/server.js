require("dotenv").config()
var helmet=require('helmet')
const {createServer}=require("http")
const {Server}=require("socket.io")
const express = require('express')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const app = express()
app.use(helmet({
  contentSecurityPolicy: false, 
  crossOriginEmbedderPolicy: false
}))
const httpServer=createServer(app)
global.io=new Server(httpServer)

app.use(cookieParser())
app.use(fileUpload())
app.use(express.json())

const port = 5000

const apiRoutes = require("./routes/apiRoutes")
app.use('/api', apiRoutes)

// app.listen(port, () => {
//     console.log(`My app listening on port ${port}`)
//   })
httpServer.listen(port,()=>console.log(`My app listening on port ${port}`))

//mongodb connection
const connectDB = require("./config/db")
connectDB();

const path = require("path");
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));
    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html")));
} else {
   app.get("/", (req,res) => {
      res.json({ message: "API running..." }); 
   }) 
}

app.use((error, req, res, next) => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    next(error);
  })

  app.use((error, req, res, next) => {
    if (process.env.NODE_ENV === "development") {
      res.status(500).json({
        message: error.message,
        stack: error.stack,
      }
      )
    } else {
      res.status(500).json({
        message: error.message,
      })
    }
    next(error);
  })