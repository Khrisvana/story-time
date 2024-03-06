import ApiException from "./ApiException";

export default class ApiBadRequestException extends ApiException {
    constructor( response: any, error:any  ){
        super({
            error,
            message : "bad request",
            status_code : 400,
            response
        })
    }
}