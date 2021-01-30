class Http_Responses {

    baseEndpoint(message, data) {
        return {
            message,
            status: "success",
            data,
        }
    };

    validationSuccessful(message, status, data) {
        return {
            message,
            status,
            data
        }
    }

    error(message) {
        return {
            message,
            status: "error",
            data: null
        }
    }

    validationFailed(message, status, data) {
        return {
            message,
            status,
            data
        }
    }
}
const responses = new Http_Responses()
module.exports = responses