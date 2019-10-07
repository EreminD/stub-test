import {Express} from "express";

export class Routes {
    private readonly routesSet: Map<string, string> = new Map();

    addRoute(path: string, handler: string, app: Express): void {
        console.log(`${path} ->> ${handler}`);
        this.routesSet.set(path, handler);
        app.get(`/stub/${path}`, (res, request) => request.send(handler));
    }
}

