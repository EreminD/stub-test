export interface ValueSetter {
    setValue(value: any, body: any, stepsToTarget: Array<string>): void;
}