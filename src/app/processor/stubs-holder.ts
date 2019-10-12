import {RequestSpecification} from "../model/request-specification";
import {ResponseProcessor} from "./response-processor";
import {EventEmitter} from "events";
import {Express} from "express";

export class StubsHolder {
    readonly newStub: EventEmitter;
    private readonly _routes: Map<string, any> = new Map();
    private readonly _theApp: Express;

    constructor(app: Express){
        this._theApp = app;
        this.newStub = new EventEmitter();
    }

    addRoute(requestSpecification: RequestSpecification): void {
        const responseProcessor =
            new ResponseProcessor(requestSpecification.responseSpecification, requestSpecification.mutations);

        this._theApp._router.stack.forEach((s:any) => console.log(JSON.stringify(s)));



        this.newStub.emit('newStub', requestSpecification, responseProcessor);
    }
}

