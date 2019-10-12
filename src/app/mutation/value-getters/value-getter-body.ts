import {ValueGetter} from "./value-getter";

export class ValueGetterBody implements ValueGetter{
    getValue(request: any, stepsToValue: Array<string>): any {
        let value = request['body'];
        stepsToValue.forEach(step => value = value[step]);
        console.log(`Got value from BODY by path ${stepsToValue} -> ${value}`);
        return value;
    }

}