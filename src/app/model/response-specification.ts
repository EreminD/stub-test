export interface ResponseSpecification {
    statusCode: number,
    statusMessage: string,
    headers: Array<object>,
    body? : any,
    cookies: Array<object>
}