const express = require("express")
const cors = require("cors")
const config = require("./config/settings")
const response = require("./libs/response")
const validateRoute = require("./route/index")
//connects to mongodb
require("./db/db")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())
app.use(validateRoute)

//base end point
const contactDetails = {
    name: config.CONTACTS.Name,
    github: config.CONTACTS.Github,
    email: config.CONTACTS.Mail,
    mobile: config.CONTACTS.Mobile,
    twitter: config.CONTACTS.Twitter
}
app.get('/', (req, res) => {
    res.status(200).send(
        response.baseEndpoint(
            `${config.AppName}.`,
            contactDetails
        )
    )
})

module.exports = app