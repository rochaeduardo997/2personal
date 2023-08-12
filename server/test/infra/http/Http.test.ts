import ExpressAdapter from '../../../src/infra/http/ExpressAdapter';
import IHttp from '../../../src/infra/http/IHttp';
import JWTAdapter from '../../../src/infra/token/JWTAdapter';

import supertest from 'supertest';

let http: IHttp;

beforeAll(() => {
  const token = new JWTAdapter();
  http = new ExpressAdapter(token);
  http.addRoute('get', '/auth', () => { return { code: 200, result: true }});
  http.setupRouters();
});

describe('Success cases', () => {
  test('Validate GET route', async () => {
    const { statusCode, body } = await supertest(http.http).get('/api/auth');
    expect(statusCode).toBe(200);
    expect(body).toBeTruthy();
  });
});

