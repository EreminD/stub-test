export class CollectionUtil {
    static arrayToMap(data: any, map: Map<string, any>): void{
        if (data) {
            (data as Array<any>).forEach(item => {
                const key = Object.keys(item)[0];
                const value = item[key];
                map.set(key, value);
            });
        }
    }
}