import {ValueGetter} from "./value-getter";

export class ValueGetterQuery implements ValueGetter{
    getValue(request: any, stepsToValue: Array<string>): any {
        const value = request['query'][stepsToValue[0]];
        console.log(`Got value from QUERY by path ${stepsToValue} -> ${value}`);
        return value;
    }

}