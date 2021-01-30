const express = require("express")
const router = express.Router()
const indexController = require("../controller/index");
const { validateRule } = require("../middleware/validator")

router.post("/validate-rule",
    validateRule,
    (req, res) => indexController.ruleValidation(req, res)
)

module.exports = router