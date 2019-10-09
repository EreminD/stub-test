import {Request} from "express";

export class RequestLogger {
    log(request: Request): void{
        console.log(request.url);
        console.log(request.route.path);
        console.log(request.query);
        console.log(request.params);
        console.log(request.method);
        console.log(request.headers);
        console.log(request.cookies);
        console.log(request.body);
    }
}