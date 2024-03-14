import ApiException from "./ApiException"

export default class ApiUnauthenticatedException extends ApiException{
    constructor( response: any, error: any ){
        super({
            error: null,
            message : "tidak terotentikasi",
            status_code : 401,
            response: null
        })
    }
}