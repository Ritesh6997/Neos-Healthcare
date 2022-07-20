const { json } = require("express")
const express = require("express")
const UserController = require("./controller/userController")
const app = express()
app.use(json())

app.use("/",UserController)

app.listen(5000, () => {
    console.log("Listining at port 5000")

})