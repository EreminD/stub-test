import {StubsHolder} from "./stubs-holder";
import {RequestSpecification} from "../model/request-specification";
import {Method} from "../model/method-enum";
import {Request} from "express";
import {Config} from "../config";
import {ResponseSpecification} from "../model/response-specification";
import {CollectionUtil} from "../utils/collection-util";

export class RequestProcessor {
    private readonly _routeHolder: StubsHolder;

    constructor(routeHolder: StubsHolder) {
        this._routeHolder = routeHolder;
    }

    registerStub(request: Request): RequestSpecification{
        const reqSpec: RequestSpecification = this.mapRequestToRequestSpecification(request);
        this._routeHolder.addRoute(reqSpec);
        return reqSpec;
    }

    private mapRequestToRequestSpecification(request: Request): RequestSpecification{
        const requestSpecification: RequestSpecification = {} as RequestSpecification;

        requestSpecification.method = this.defineHttpMethod(request);
        requestSpecification.path = Config.defaults.stubPath + request.body['path'];
        requestSpecification.responseSpecification = this.createResponseSpecification(request);
        requestSpecification.mutations = request.body['mutations'] || [];

        return requestSpecification;
    }

    private defineHttpMethod(request: Request): Method{
        const methodName = request.body['method'] || Config.defaults.method;
        return (<any>Method)[methodName.toUpperCase()];
    }

    private createResponseSpecification(request: Request): ResponseSpecification {
        const responseSpecification = Config.defaults.responseSpecification as ResponseSpecification;
        const response = request.body['response'];

        responseSpecification.statusCode = response['statusCode'];
        responseSpecification.statusMessage = response['statusMessage'];
        responseSpecification.body = response['body'];
        CollectionUtil.arrayToMap(response['cookies'], responseSpecification.cookies);
        CollectionUtil.arrayToMap(response['headers'], responseSpecification.headers);

        return responseSpecification;
    }
}