export class ServerConfig {
    static getPort() : number {
        const param = process.argv.find(arg => arg.startsWith('port='));
        return param ? +(param.replace('port=', '')) : 3000;
    }
}