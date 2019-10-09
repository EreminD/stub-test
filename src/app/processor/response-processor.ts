import {ResponseSpecification} from "../model/response-specification";
import {Mutation} from "../mutation/mutation";
import {Request} from "express";

export class ResponseProcessor {
    private readonly _responseSpecification: ResponseSpecification;
    private readonly _mutations: Array<Mutation>;


    constructor(response: ResponseSpecification, mutations: Array<Mutation>) {
        this._responseSpecification = response;
        this._mutations = mutations;
    }

    applyMutations(request: Request): ResponseSpecification{
        this._mutations.forEach(mutation => this.applyMutation(request, mutation));
        return this._responseSpecification;
    }

    private applyMutation(request: Request, mutation: Mutation): void{
const path = mutation.path.replace('$.', '');
        console.log(mutation.source)
        console.log(request[mutation.source])
        const valueToInsert = this.getValueFromBody(request.body, mutation.value);

        console.log(`Got value=${valueToInsert} by path ${mutation.value}`);
        this._responseSpecification.body = this._responseSpecification.body || {};
        this._responseSpecification.body[path] = valueToInsert;
        console.log(this._responseSpecification.body)
    }

    private getValueFromBody(body: any, path: string): any {
        const pathSteps = path.replace('$.', '').split('.');
        let value = body;
        pathSteps.forEach(step => {
            value = value[step]
            console.log(`Step ${step} --> ${value}`)
        });
        return value;
    }
}