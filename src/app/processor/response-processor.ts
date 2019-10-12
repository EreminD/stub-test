import {ResponseSpecification} from "../model/response-specification";
import {Mutation} from "../mutation/mutation";
import {Request} from "express";
import {ValueGetter} from "../mutation/value-getters/value-getter";
import {ValueGetterBody} from "../mutation/value-getters/value-getter-body";
import {ValueSetter} from "../mutation/value-setters/value-setter";
import {ValueSetterBody} from "../mutation/value-setters/value-setter-body";
import {ValueGetterQuery} from "../mutation/value-getters/value-getter-query";

export class ResponseProcessor {
    private readonly _valueGetters: Map<string, ValueGetter>;
    private readonly _valueSetters: Map<string, ValueSetter>;

    constructor() {
        this._valueGetters = new Map<string, ValueGetter>();
        this._valueSetters = new Map<string, ValueSetter>();
        this._valueGetters.set('body', new ValueGetterBody());
        this._valueGetters.set('query', new ValueGetterQuery());
        this._valueSetters.set('body', new ValueSetterBody());
    }


    applyMutations(request: Request, responseSpecification: ResponseSpecification, mutations: Array<Mutation>): ResponseSpecification{
        mutations.forEach(mutation => this.applyMutation(request, responseSpecification, mutation));
        return responseSpecification;
    }

    private applyMutation(request: Request, responseSpecification: ResponseSpecification, mutation: Mutation): void {
        if (mutation.value) {
            console.log('Start body mutation');
            const getterName = mutation.value.split('.')[0];
            const getter = this._valueGetters.get(getterName);

            if (!getter) throw new Error(`Unknown value source ${getterName}`);
            const value = getter.getValue(request, mutation.value.split('.').slice(1));

            const setterName = mutation.target.split('.')[0];
            const setter = this._valueSetters.get(setterName);
            if (!setter) throw new Error(`Unknown value source ${setterName}`);
            setter.setValue(value, responseSpecification, mutation.target.split('.').slice(1));

            console.log(responseSpecification.body);
        } else {
            console.log(`${JSON.stringify(mutation)}`)
            mutation.fn;
        }
    }
}