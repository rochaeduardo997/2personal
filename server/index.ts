import ExpressAdapter from './src/infra/http/ExpressAdapter';

const http = new ExpressAdapter();

http.addRoute('get', '/', (request: any, reply: any) => {
  return {
    code: 200,
    result: 'hello'
  }
});

http.setupRouters();

http.init(3000);

