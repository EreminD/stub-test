import {ResponseSpecification} from "./response-specification";

export interface ServerConfig {
    port: number;
    method: string;
    stubPath: string;
    responseSpecification: ResponseSpecification;
}