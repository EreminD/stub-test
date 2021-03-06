import express = require('express');
import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import {Request, Response} from "express";
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
const stubHolder: StubsHolder = new StubsHolder(app);
const requestProcessor: RequestProcessor = new RequestProcessor(stubHolder);

app.get('/',  (request, response) => {
    response.send('all stubs are available on /stub')
});

app.post('/set', (request: Request, response) => {
    const reqSpec = requestProcessor.registerStub(request);
    response.statusMessage = 'Stub created';
    response.statusCode = 201;
    response.send(reqSpec);
});

app.listen(port, () => {
    console.log(`started on http://localhost:${port}`);
    console.log(`Send POST on http://localhost:${port}/set to set a new stub`)
});

stubHolder.newStub.on('newStub',(specification:RequestSpecification, processor: ResponseProcessor) => {
        const method: Method = specification.method;
        const path: string = specification.path;

        switch (method) {
            case Method.GET: {
                app.get(path, (req: Request, res) => res.send(processor));
                break;
            }
            case Method.POST: {
                // app.routes.stack.forEach((s:any) => console.log(JSON.stringify(s)));
                app.post(path, (req: Request, res: Response) => {
                    requestLogger.log(req);
                    const respSpec:ResponseSpecification = processor.applyMutations(req);

                    res.statusCode = respSpec.statusCode;
                    res.statusMessage = respSpec.statusMessage;
                    respSpec.headers.forEach((value,key) => res.setHeader(key, value));
                    respSpec.cookies.forEach((value, key) => res.cookie(key, value));
                    res.send(respSpec.body);
                });
                break;
            }
        }
    });