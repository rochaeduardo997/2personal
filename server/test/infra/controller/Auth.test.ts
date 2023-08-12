import IHttp from '../../../src/infra/http/IHttp';
import ExpressAdapter from '../../../src/infra/http/ExpressAdapter';
import User from '../../../src/domain/entity/User';
import RepositoryFactoryMemory from '../../../src/infra/factory/RepositoryFactoryMemory';
import { generateUser } from '../../seeds/user';
import AuthController from '../../../src/infra/controller/AuthController';
import CryptoAdapter from '../../../src/infra/crypto/CryptoAdapter';
import JWTAdapter from '../../../src/infra/token/JWTAdapter';

import supertest from 'supertest';
import * as dotenv from 'dotenv';
dotenv.config();

let request: any;
let http: IHttp;
let user1: User;
let user2: User;

beforeAll(async () => {
  http = new ExpressAdapter();
  await prepareController(http);
  http.setupRouters();
});

async function prepareController(http: IHttp){
  const repositoryFactory = new RepositoryFactoryMemory();
  const userRepository = repositoryFactory.userRepository();

  const crypto = new CryptoAdapter();
  const token = new JWTAdapter();

  user1 = generateUser(1);
  user2 = generateUser(2);

  user1.password = crypto.encrypt(user1.password);
  user2.password = crypto.encrypt(user2.password);

  user1 = await userRepository.save(user1);
  user2 = await userRepository.save(user2);

  new AuthController('auth', http, userRepository, token, crypto);
}

describe('Successful cases', () => {
  test('Login as user with username', async () => {
    const input = {
      login: user1.username,
      password: `password${user1.id}`
    };

    const result = await supertest(http.http)
      .post('/api/auth/')
      .send(input);

    expect(result.status).toBe(200);
    expect(result.body).toHaveLength(272);
  });

  test('Login as user with email', async () => {
    const input = {
      login: user1.email,
      password: `password${user1.id}`
    };

    const result = await supertest(http.http)
      .post('/api/auth/')
      .send(input);

    expect(result.status).toBe(200);
    expect(result.body).toHaveLength(272);
  });
});

describe('Failure cases', () => {
  test('Fail login as user with wrong username', async () => {
    const input = {
      login: 'fail',
      password: `password${user1.id}`
    };

    const result = await supertest(http.http)
      .post('/api/auth/')
      .send(input);

    expect(result.status).toBe(401);
    expect(result.body).toBe('Login failed, verify provided credentials');
  });
});

