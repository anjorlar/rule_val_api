const app = require("./app")
const config = require("./config/settings")

const Port = config.PORT

app.listen(Port, () => {
    console.log(`Service is running on Port: ${Port}`)
})