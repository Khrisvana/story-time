import ApiException from "./ApiException"

export default class ApiUnauthenticatedException extends ApiException{
    constructor( response: any, error: any ){
        super({
            error,
            message : "Unauthenticated",
            status_code : 401,
            response
        })
    }
}