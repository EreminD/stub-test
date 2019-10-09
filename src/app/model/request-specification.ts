import {Method} from "./method-enum";
import {ResponseSpecification} from "./response-specification";
import {Mutation} from "../mutation/mutation";

export interface RequestSpecification{
    method: Method;
    path: string;
    responseSpecification: ResponseSpecification;
    mutations: Array<Mutation>;
}