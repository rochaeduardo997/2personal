import supertest from 'supertest';
import IHttp from '../../../src/infra/http/IHttp';
import ExpressAdapter from '../../../src/infra/http/ExpressAdapter';

let request: any;
let http: IHttp;

beforeAll(() => {
  http = new ExpressAdapter();
});

beforeEach(() => {
  request = request(http.http);
});

describe('Successful cases', () => {
  test('Login', () => {
  });
});
