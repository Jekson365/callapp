import fs from 'fs'

export function fetchData(req, res) {
    fs.readFile("data.json", 'utf-8', (err, data) => {
        res.status(200).json(JSON.parse(data))
    })

}