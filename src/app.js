const express = require("express")
const cors = require("cors")
const config = require("./config/settings")
const response = require("./libs/response")
//connects to mongodb
require("./db/db")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())
// app.use(rulesRoute)

//base end point
app.get('/', (req, res) => {
    res.status(200).send(
        response.baseEndpoint(
            `Health Check, Base End-Point for ${config.AppName}.`,
            config.CONTACTS.Name,
            config.CONTACTS.Github,
            config.CONTACTS.Mail,
            config.CONTACTS.Mobile,
            config.CONTACTS.Twitter
        )
    )
})

module.exports = app