export interface ErrorResponseInterface {
    statusCode: number
}

export default class ErrorResponse extends Error implements ErrorResponse {
    public statusCode: number

    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
    }
}

