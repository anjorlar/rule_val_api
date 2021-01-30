const joi = require("joi");
const Response = require("../libs/response");


exports.validateRule = async (req, res, next) => {
    try {
        const val = req.body
        const data = await validateRuleSchema.validate({ val, validateRuleSchema });
        if (data) {
            return next()
        };
    } catch (error) {
        logger.error(error.details || error)
        if (error.details) {
            const errDetails = error.details.map((i) => ({
                message: i.message.replace(/['"]/g, "").replace(/must/, 'should') + '.',
            }));
            return res.status(400).send(Response.error(errDetails[0].message));
        }
        return res.status(400).send(Response.error('Invalid JSON payload passed.'));
    }
};

const validateRuleSchema = joi.object().keys({
    rule: joi.object().keys({
        field: joi.string().required(),
        condition: joi.string().required(),
        condition_value: joi.any().required(),
    }).required(),
    data: joi.any().required()
});