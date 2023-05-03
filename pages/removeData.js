import express from 'express'
import fs from 'fs'

const data = JSON.parse(fs.readFileSync("data.json"))

export async function deleteData(req, res) {
    
    const updatedData = await data.filter((each)=> each.id !== Number(req.params.id))

    fs.writeFileSync("data.json",JSON.stringify(updatedData))

    res.status(200).json("removed")
}