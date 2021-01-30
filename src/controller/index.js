const joi = require("joi")
const Response = require("../libs/response");
const { condition } = require("../libs/conditions")
const logger = require("../libs/logger");

class IndexController {

    async ruleValidation(req, res) {
        try {
            const { rule, data } = req.body
            // if (!rule) {
            //     return res.status(400).send(
            //         Response.error(`rule field is required.`)
            //     )
            // }
            if (!data) {
                return res.status(400).send(
                    Response.error(`data field is required.`)
                )
            }
            if (rule.constructor !== Object) {
                return res.status(400).send(
                    Response.error(`rule should be an object.`)
                )
            }
            const dataKeys = Object.keys(data);
            const check = rule.field.split('.');
            if (!dataKeys.includes(check[0])) {
                return res.status(400).send(
                    Response.error(`field ${check[0]} is missing from data`)
                )
            };
            if (check.length > 1) {
                const schema = joi.object().keys({
                    name: joi.string(),
                    crew: joi.string(),
                    age: joi.number(),
                    position: joi.string(),
                    [check[0]]: joi.object().keys({
                        count: joi.number().required(),
                        successful: joi.number().optional(),
                        failed: joi.number(),
                    })
                })
                const value = await schema.validate({ data, schema });
                if (value) {
                    if (condition(rule.condition, data.missions.count, rule.condition_value)) {
                        const successData = {
                            "validation": {
                                "error": false,
                                "field": `${rule.field}`,
                                "field_value": data[check[0]][check[1]],
                                "condition": rule.condition,
                                "condition_value": rule.condition_value
                            }
                        }
                        return res.status(200).send(
                            Response.validationSuccessful(`field ${rule["field"]} successfully validated.`, "success", successData)
                        );
                    } else {
                        const errData = {
                            validation: {
                                error: true,
                                field: `${rule.field}`,
                                field_value: data[check[0]][check[1]],
                                condition: rule.condition,
                                condition_value: rule.condition_value
                            }
                        }
                        return res.status(400).send(
                            Response.validationFailed(`field ${rule.field} failed validation.`, "error", errData)
                        );
                    }
                }
            } else {
                if (data[check[0]] !== undefined) {
                    if (condition(rule.condition, data[check[0]], rule.condition_value)) {
                        const successData = {
                            validation: {
                                error: false,
                                field: check[0],
                                field_value: data[check[0]],
                                condition: rule.condition,
                                condition_value: rule.condition_value
                            }
                        };
                        return res.status(200).send(
                            Response.validationSuccessful(`field ${rule.field} successfully validated.`, "success", successData)
                        );
                    } else {
                        const errData = {
                            validation: {
                                error: true,
                                field: check[0],
                                field_value: data[check[0]],
                                condition: rule.condition,
                                condition_value: rule.condition_value
                            }
                        }
                        return res.status(400).send(
                            Response.validationFailed(`field ${rule.field} failed validation.`, "error", errData)
                        );
                    }
                } else {
                    if (condition(rule.condition, data, rule.condition_value)) {
                        const successData = {
                            validation: {
                                error: false,
                                field: check[0],
                                field_value: data[check[0]],
                                condition: rule.condition,
                                condition_value: rule.condition_value
                            }
                        };
                        return res.status(200).send(
                            Response.validationSuccessful(`field ${rule.field} successfully validated.`, "success", successData)
                        );
                    } else {
                        const errData = {
                            validation: {
                                error: true,
                                field: check[0],
                                field_value: data[check[0]],
                                condition: rule.condition,
                                condition_value: rule.condition_value
                            }
                        }
                        return res.status(400).send(
                            Response.validationFailed(`field ${rule.field} failed validation.`, "error", errData)
                        );
                    }
                }
            }
        } catch (error) {
            logger.error(error.details || error)
            if (error.details) {
                const errDetails = error.details.map((i) => ({
                    message: i.message.replace(/['"]/g, "").replace(/must/, 'should') + '.',
                }));
                logger.error(errDetails[0].message);
                return res.status(400).send(
                    Response.error(errDetails[0].message)
                );
            }
            return res.status(400).send(
                Response.error('Invalid JSON payload passed.')
            );
        }
    }
}


const indexController = new IndexController();
module.exports = indexController;