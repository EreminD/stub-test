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
        const value = this.getValue(request.body, mutation.value);
        this.setValue(this._responseSpecification.body, mutation.path, value)

        console.log(this._responseSpecification.body)
    }

    private getValue(target: any, path: string): any {
        let value = target;
        const pathSteps = path.replace('$.', '').split('.');
        pathSteps.forEach(step => value = value[step]);
        return value;
    }

    private setValue(target:any, path: string, value: any): void{
        const pathSteps = path.replace('$.', '').split('.');
        const deep = pathSteps.length-1;
        let currentNode = target;
        for (let i =0; i<deep; i++){
            const step = pathSteps[i];
            currentNode[step] = currentNode[step] || {};
            currentNode = currentNode[step];
        }
        const lastChild = pathSteps[pathSteps.length-1];
        currentNode[lastChild] = value;
    }
}