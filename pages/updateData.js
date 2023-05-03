import express from 'express'
import fs from 'fs'


const data = JSON.parse(fs.readFileSync("data.json"))


export function updateData(req, res) {
    const { name, email, gender, address, phone } = req.body
    const updatedData = data.map((each) => {
        if (each.id === Number(req.params.id)) {
            return {
                ...each,
                name: name,
                email: email,
                gender: gender,
                address: address,
                phone: phone
            }
        }
        return each
    })
    fs.writeFileSync("data.json", JSON.stringify(updatedData))
    res.status(200).json("updated!")
}