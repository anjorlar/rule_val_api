require("dotenv").config()
const settings = {
    AppName: process.env.APPNAME,
    PORT: process.env.PORT,
    MONGODB: {
        MONGOURL: process.env.MONGODBURL,
        TESTDB: process.env.TESTDB
    },
    CONTACTS: {
        Name: process.env.NAME,
        Github: process.env.GITHUB,
        Mail: process.env.EMAIL,
        Mobile: process.env.MOBILE,
        Twitter: process.env.Twitter
    }
}

module.exports = settings