export interface Mutation {
    source: 'body'|'headers'|'cookies';
    value: any;

    target: 'body'|'headers'|'cookies';
    path: string;

    apply(): void;
}