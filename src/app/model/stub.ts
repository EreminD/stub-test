import {RequestSpecification} from "./request-specification";
import {ResponseSpecification} from "./response-specification";

export class Stub {
    private readonly _requestSpecification: RequestSpecification;
    private readonly _responseSpecification: ResponseSpecification;

    constructor(requestSpecification: RequestSpecification, responseSpecification: ResponseSpecification) {
        this._requestSpecification = requestSpecification;
        this._responseSpecification = responseSpecification;
    }

    get requestSpecification(): RequestSpecification {
        return this._requestSpecification;
    }

    get responseSpecification(): ResponseSpecification {
        return this._responseSpecification;
    }
}