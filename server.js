import express from 'express'
import cors from 'cors'
import fs from 'fs'
import { fetchData } from './pages/getData.js'
import { deleteData } from './pages/removeData.js'
import { updateData } from './pages/updateData.js'
import { addNewUser } from './pages/newUser.js'


const PORT_NUMBER = 8080


const app = express()


// read file

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => { res.send("hello world") })
app.get("/data", fetchData)
app.post("/deleteuser/:id", deleteData)
app.put("/updateuser/:id",updateData)
app.post("/addnew",addNewUser)


app.listen(PORT_NUMBER, () => {
    console.log("server is listening!")
})