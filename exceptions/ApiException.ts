export default class ApiException {
    stack
    name
    status_code
    response
    error

    constructor({ message, response, status_code, error }: any) {
        message = message ?? "-"
        this.stack = new Error(message).stack
        this.name = this.constructor.name
        this.status_code = status_code ?? response.status ?? 500
        this.response = response
        this.error = error
    }

    data() {
        if (this.response) {
            if (this.response?._data) return this.response._data
        }

        return undefined
    }
}
