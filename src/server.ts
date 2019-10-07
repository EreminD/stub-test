import express = require('express');
import bodyParser = require('body-parser');
import {Request} from "express";
import {ServerConfig} from "./server-config";
import {RequestLogger} from "./request-logger";
import {Routes} from "./routes";

const port = ServerConfig.getPort();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const routes = new Routes();

app.get('/',  (res, request) => {
    request.send('all stubs are available on /stub')
});

app.get('/set', (response, request) => {
    const req: Request = request.req as Request;
    new RequestLogger().log(req);
    const query = req.query;
    const params: Array<string> = Object.keys(query);
    params.forEach(route => {
        routes.addRoute(route, query[route], app)
    });
    request.send(params)
});

app.listen(port, () => {
    console.log(`started on http://localhost:${port}`);
});