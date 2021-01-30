
exports.condition = (key, field_value, condition_value) => {
    return {
        gte: field_value >= condition_value,
        neq: field_value !== condition_value,
        gt: field_value > condition_value,
        eq: field_value === condition_value,
        contains: `${condition_value}`.includes(field_value)
    }[key]
}