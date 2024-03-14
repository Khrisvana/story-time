import ApiException from "./ApiException"

export default class ApiNotFoundException extends ApiException{
    constructor( error: any ){
        super({
            error: error,
            message : "Not Found",
            status_code : 404,
            response: null
        })
    }
}