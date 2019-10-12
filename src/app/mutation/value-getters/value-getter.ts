export interface ValueGetter {
    getValue(body: any, stepsToValue: Array<string>): any;
}