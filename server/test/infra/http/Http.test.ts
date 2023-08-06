import ExpressAdapter from '../../../src/infra/http/ExpressAdapter';
import IHttp from '../../../src/infra/http/IHttp';
import supertest from 'supertest';

let http: IHttp;
let request: any;

beforeAll(() => {
  http = new ExpressAdapter();
  http.addRoute('get', '/', () => { return { code: 200, result: true }});
  http.setupRouters();
});

describe('Success cases', () => {
  test('Validate GET route', async () => {
    const { statusCode, body } = await supertest(http.http).get('/api/');
    expect(statusCode).toBe(200);
    expect(body).toBeTruthy();
  });
});

