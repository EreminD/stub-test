// import {StubsHolder} from "../app/router/route-holder";
// import {RequestProcessor} from "../app/processor/request-processor";
// import {RequestSpecification} from "../app/model/request-specification";
// import {anyOfClass, capture, instance, mock, verify} from "ts-mockito";
// import {Method} from "../app/model/method-enum";
//
// let routeHolder: StubsHolder;
// let processor: RequestProcessor;
//
// beforeEach(() => {
//     routeHolder = mock(StubsHolder);
//     processor = new RequestProcessor(instance(routeHolder));
// });
//
// test('Request processor sets new stub', () => {
//     const requestSpecification = new RequestSpecification(Method.POST, '', '');
//     processor.registerStub(requestSpecification);
//     verify(routeHolder.addRoute(anyOfClass(RequestSpecification))).called();
// });
//
// test('Request processor sets default method = GET', () => {
//     const req = Object.create(Request);
//     const reqSpec = new RequestSpecification(req['method'], '/api/user/get', '');
//     processor.registerStub(reqSpec);
//     const passedReqSpec = capture(routeHolder.addRoute).last()[0];
//     expect(passedReqSpec.method).toBe(Method.GET);
// });