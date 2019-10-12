import {ValueSetter} from "./value-setter";

export class ValueSetterBody implements ValueSetter{
    setValue(value: any, response: any, stepsToTarget: Array<string>): void{
        console.log(`Setting value=${value} to BODY by path ${stepsToTarget}`);
        const deep = stepsToTarget.length-1;
        let currentNode = response['body'];
        for (let i =0; i<deep; i++){
            const step = stepsToTarget[i];
            currentNode[step] = currentNode[step] || {};
            currentNode = currentNode[step];
        }
        const lastChild = stepsToTarget[stepsToTarget.length-1];
        currentNode[lastChild] = value;
    }
}