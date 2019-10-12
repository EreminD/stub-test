import {ServerConfig} from "./model/server-config";

export class Config {
    // TODO: make config in file

    static defaults = {} as ServerConfig;


    static init() {
        this.defaults.method = 'GET';
        this.defaults.port = 3000;
        this.defaults.stubPath = '/stub';
        this.defaults.responseSpecification = {
                    statusCode: 200,
                    statusMessage: 'Oki-Doki',
                    headers: new Map(),
                    cookies: new Map()
                }


    }


    static getPort() : number {
        const param = process.argv.find(arg => arg.startsWith('port='));
        return param ? +(param.replace('port=', '')) : this.defaults.port;
    }
}

// { "value": "header.test-header", "target": "body.testHeader"},
// { "value": "header.test-header", "target": "cookie.cookieResp"},
// { "value": "cookie.cookieA", "target": "body.cookie"},
// { "value": "query.cookieA", "target": "header.cookie-resp"},
// { "value": "query.queryPara1", "target": "body.queryValue"},
// { "value": "query.queryPara1", "fn": "increment", "target": "body.queryValue"},