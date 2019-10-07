import express = require('express');
import {Request} from "express";
import {RequestLogger} from "./request-logger";
import {Routes} from "./routes";


const app = express();
const routes = new Routes();

app.get('/', (res, request) => {
    const req: Request = request.req as Request;
    new RequestLogger().log(req);
    request.send('Hi!');
});

app.get('/set', (res, request) => {
    const req: Request = request.req as Request;
    new RequestLogger().log(req);
    const query = req.query;
    const params: Array<string> = Object.keys(query);
    params.forEach(route => {
        routes.addRoute(route, query[route], app)
    })
    request.send(params)
});


app.listen(3000, ()=> {
    routes.addRoute('testa', 'testb', app);
    console.log('started on http://localhost:3000');
    app.get('base', (res, request) => request.send('B!'));
});