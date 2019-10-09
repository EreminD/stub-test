import express = require('express');
import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import {Request} from "express";
import {Config} from "./config";
import {RequestLogger} from "./request-logger";
import {StubsHolder} from "./processor/stubs-holder";
import {RequestProcessor} from "./processor/request-processor";
import {RequestSpecification} from "./model/request-specification";
import {Method} from "./model/method-enum";
import {ResponseProcessor} from "./processor/response-processor";
import {ResponseSpecification} from "./model/response-specification";

Config.init();
const port = Config.getPort();
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const requestLogger = new RequestLogger();
const routeHolder: StubsHolder = new StubsHolder();
const requestProcessor: RequestProcessor = new RequestProcessor(routeHolder);

routeHolder.onNewStubRule.on('newStub',
    (requestSpecification:RequestSpecification, responseProcessor: ResponseProcessor) => {
    const method: Method = requestSpecification.method;
    const path: string = requestSpecification.path;

    switch (method) {
        case Method.GET: {
            app.get(path, (req: Request, res) => res.send(responseProcessor));
            break;
        }
        case Method.POST: {

            app.post(path, (req: Request, res) => {
                requestLogger.log(req);
                const respSpec:ResponseSpecification = responseProcessor.applyMutations(req);
                res.send(respSpec.body);
            });
            break;
        }
    }
});

app.get('/',  (request, response) => {
    response.send('all stubs are available on /stub')
});

app.post('/set', (request: Request, response) => {
    requestLogger.log(request);
    const reqSpec = requestProcessor.registerStub(request);

    response.statusMessage = 'Stub created';
    response.statusCode = 201;
    response.send(reqSpec);
});

app.listen(port, () => {
    console.log(`started on http://localhost:${port}`);
    console.log(`Send POST on http://localhost:${port}/set to set a new stub`)
});

