const app = require("./app")
const config = require("./config/settings")
const logger = require("./libs/logger")
const Port = config.PORT

app.listen(Port, () => {
    logger.info(`Service is running on Port: ${Port}`)
})