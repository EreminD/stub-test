import {ResponseSpecification} from "../model/response-specification";
import {Request} from "express";

export interface Mutation {
    value: string;
    fn: string;
    target: string;

    apply(request: Request, responseSpecification: ResponseSpecification): void;
}