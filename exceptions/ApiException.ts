export default class ApiException extends Error {
    name
    status_code
    response
    error

    constructor({ message, response, status_code, error }: any) {
        super(message);
        this.name = this.constructor.name
        this.status_code = status_code ?? response.status ?? 500
        this.response = response
        this.error = error

        Error.captureStackTrace(this, this.constructor);
    }

    data() {
        if (this.response) {
            if (this.response?._data) return this.response._data
        }

        return undefined
    }
}
