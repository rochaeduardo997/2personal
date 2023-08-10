import supertest from 'supertest';
import * as dotenv from 'dotenv';

import IHttp from '../../../src/infra/http/IHttp';
import ExpressAdapter from '../../../src/infra/http/ExpressAdapter';
import User from '../../../src/domain/entity/User';
import RepositoryFactoryMemory from '../../../src/infra/factory/RepositoryFactoryMemory';
import { generateUser } from '../../seeds/user';
import UserController from '../../../src/infra/controller/UserController';

dotenv.config();

let http: IHttp;
let user1: User;
let user2: User;

async function prepareController(http: IHttp){
  const repositoryFactory = new RepositoryFactoryMemory();
  const userRepository = repositoryFactory.userRepository();

  user1 = generateUser(1);
  user2 = generateUser(2);

  await userRepository.save(user1);
  await userRepository.save(user2);
  new UserController('users', http, userRepository);
}

beforeAll(async () => {
  http = new ExpressAdapter();
  await prepareController(http);
  http.setupRouters();
});

describe('Successful cases', () => {
  test('Get all', async () => {
    const result = await supertest(http.http).get('/api/users/');
    expect(result.status).toBe(200);
    expect(result.body).toHaveLength(2);
    expect(result.body[0].id).toBe(user1.id);
    expect(result.body[0].name).toBe(user1.name);
    expect(result.body[0].surname).toBe(user1.surname);
    expect(result.body[0].username).toBe(user1.username);
    expect(result.body[0].role).toBe(user1.role);
    expect(result.body[0].status).toBe(user1.status);
    expect(new Date(result.body[0].created_at)).toEqual(new Date(user1.created_at));
    expect(new Date(result.body[0].updated_at)).toEqual(new Date(user1.updated_at));
    expect(result.body[0].deleted_at).toBeUndefined();
    expect(result.body[1].id).toBe(user2.id);
    expect(result.body[1].name).toBe(user2.name);
    expect(result.body[1].surname).toBe(user2.surname);
    expect(result.body[1].username).toBe(user2.username);
    expect(result.body[1].role).toBe(user2.role);
    expect(result.body[1].status).toBe(user2.status);
    expect(new Date(result.body[1].created_at)).toEqual(new Date(user2.created_at));
    expect(new Date(result.body[1].updated_at)).toEqual(new Date(user2.updated_at));
    expect(result.body[1].deleted_at).toBeUndefined();
  });

  test('Get by id', async () => {
    const result = await supertest(http.http).get(`/api/users/${user1.id}`);
    expect(result.status).toBe(200);
    expect(result.body.id).toBe(user1.id);
    expect(result.body.name).toBe(user1.name);
    expect(result.body.surname).toBe(user1.surname);
    expect(result.body.username).toBe(user1.username);
    expect(result.body.role).toBe(user1.role);
    expect(result.body.status).toBe(user1.status);
    expect(new Date(result.body.created_at)).toEqual(new Date(user1.created_at));
    expect(new Date(result.body.updated_at)).toEqual(new Date(user1.updated_at));
    expect(result.body.deleted_at).toBeUndefined();
  });

  test('Create user', async () => {
    const user3 = generateUser(3);
    const input = {
      name: user3.name,
      surname: user3.surname,
      username: user3.username,
      role: user3.role,
      password: user3.password
    };
    const result = await supertest(http.http)
      .post(`/api/users/`)
      .send(input);
    expect(result.status).toBe(201);
    expect(result.body.id).toBe(1);
    expect(result.body.name).toBe(user3.name);
    expect(result.body.surname).toBe(user3.surname);
    expect(result.body.username).toBe(user3.username);
    expect(result.body.role).toBe(user3.role);
    expect(result.body.status).toBe(user3.status);
    expect(new Date(result.body.created_at)).toBeInstanceOf(Date)
    expect(new Date(result.body.updated_at)).toBeInstanceOf(Date)
  });

  test('Update user', async () => {
    const input = {
      name:     'name updated',
      surname:  'surname updated',
      status:   false,
      username: 'username updated',
      password: 'password updated'
    };
    const result = await supertest(http.http)
      .put(`/api/users/${user2.id}`)
      .send(input);
    expect(result.status).toBe(200);
    expect(result.body.id).toBe(user2.id);
    expect(result.body.name).toBe(input.name);
    expect(result.body.surname).toBe(input.surname);
    expect(result.body.username).toBe(input.username);
    expect(result.body.role).toBe(user2.role);
    expect(result.body.status).toBe(input.status);
    expect(new Date(result.body.created_at)).toBeInstanceOf(Date)
    expect(new Date(result.body.updated_at)).toBeInstanceOf(Date)
  });

  test('Delete user', async () => {
    const result = await supertest(http.http).delete(`/api/users/${user2.id}`)
    expect(result.status).toBe(200);
    expect(result.body).toBeTruthy();
  });
});

