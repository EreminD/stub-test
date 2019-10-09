export interface ResponseSpecification {
    statusCode: number,
    statusMessage: string,
    headers: Map<string, string>,
    body? : any,
    cookies: Map<string, any>
}