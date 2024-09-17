interface ServiceResponse<T> {
    success : boolean
    message : string
    responseObject : T
    statusCode : number
}