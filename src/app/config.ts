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
                    statusMessage: 'Ok',
                    headers: [],
                    cookies: []
                }


    }


    static getPort() : number {
        const param = process.argv.find(arg => arg.startsWith('port='));
        return param ? +(param.replace('port=', '')) : this.defaults.port;
    }
}