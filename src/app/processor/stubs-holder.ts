import {RequestSpecification} from "../model/request-specification";
import {RouterEmitter} from "./router-emitter";
import {ResponseProcessor} from "./response-processor";


export class StubsHolder {
    private readonly routesSet: Map<RequestSpecification, ResponseProcessor> = new Map();
    private readonly _onNewStubRule: RouterEmitter;

    constructor(){
        this._onNewStubRule = new RouterEmitter();
    }

    get onNewStubRule(): RouterEmitter {
        return this._onNewStubRule;
    }

    addRoute(requestSpecification: RequestSpecification): void {
        const responseProcessor = new ResponseProcessor(requestSpecification.responseSpecification, requestSpecification.mutations);
        this.routesSet.set(requestSpecification, responseProcessor);
        this._onNewStubRule.emit('newStub', requestSpecification, responseProcessor);
    }
}