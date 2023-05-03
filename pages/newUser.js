import express from 'express'
import fs from 'fs'

const data = JSON.parse(fs.readFileSync("data.json"))

export async function addNewUser(req, res) {
    
    const newUsers = [...data,req.body]

    fs.writeFileSync("data.json",JSON.stringify(newUsers))

    res.status(200).json("added!")
}