class Responses {
    constructor() {
        return this;
    }
    /**
     * @description api response for base-end point 
     * @param {*} message 
     * @param {*} name 
     * @param {*} github 
     * @param {*} email 
     * @param {*} mobile 
     * @param {*} twitter 
     * @return {*}message, name, github,email,mobile,twitter
     */
    baseEndpoint(message, name, github, email, mobile, twitter) {
        return {
            message,
            name,
            github,
            email,
            mobile,
            twitter
        }
    }
}
const responses = new Responses()
module.exports = responses