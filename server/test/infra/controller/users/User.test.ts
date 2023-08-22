import supertest from 'supertest';
import * as dotenv from 'dotenv';
import Athlete from '../../../../src/domain/entity/users/Athlete';
import Trainer from '../../../../src/domain/entity/users/Trainer';
import User from '../../../../src/domain/entity/users/User';
import IUserRepository from '../../../../src/domain/repository/users/IUserRepository';
import AthleteController from '../../../../src/infra/controller/AthleteController';
import UserController from '../../../../src/infra/controller/UserController';
import TrainerController from '../../../../src/infra/controller/TrainerController';
import CryptoAdapter from '../../../../src/infra/crypto/CryptoAdapter';
import RepositoryFactoryMemory from '../../../../src/infra/factory/RepositoryFactoryMemory';
import ExpressAdapter from '../../../../src/infra/http/ExpressAdapter';
import IHttp from '../../../../src/infra/http/IHttp';
import JWTAdapter from '../../../../src/infra/token/JWTAdapter';
import { generateToken } from '../../../seeds/token';
import { generateUser, generateTrainer, generateAthlete } from '../../../seeds/user';

dotenv.config();

let http: IHttp;
let user1: User;
let user2: User;
let athlete1: Athlete;
let trainer1: Trainer;
let bearerToken: string;

let userRepository: IUserRepository;

async function prepareController(http: IHttp){
  const repositoryFactory = new RepositoryFactoryMemory();
  userRepository = repositoryFactory.userRepository();

  const crypto = new CryptoAdapter();

  user1 = generateUser(1);
  user2 = generateUser(2);
  trainer1 = generateTrainer(3);
  athlete1 = generateAthlete(4);

  bearerToken = `Bearer ${await generateToken(user1)}`;

  await userRepository.save(user1);
  await userRepository.save(user2);

  new UserController('users', http, userRepository, crypto);
  new TrainerController('trainers', http, userRepository, crypto);
  new AthleteController('athletes', http, userRepository, crypto);
}

beforeAll(async () => {
  const token = new JWTAdapter();
  http = new ExpressAdapter(token);
  await prepareController(http);
  http.setupRouters();
});

describe('Successful cases', () => {
  describe('User', () => {
    test('Get all', async () => {
      const result = await supertest(http.http)
        .get('/api/users/')
        .set('Authorization', bearerToken);
      expect(result.status).toBe(200);
      expect(result.body).toHaveLength(2);
      expect(result.body[0].id).toBe(user1.id);
      expect(result.body[0].name).toBe(user1.name);
      expect(result.body[0].surname).toBe(user1.surname);
      expect(result.body[0].username).toBe(user1.username);
      expect(result.body[0].role).toBe(user1.role);
      expect(result.body[0].status).toBe(user1.status);
      expect(result.body[0].email).toBe(user1.email);
      expect(new Date(result.body[0].created_at)).toEqual(new Date(user1.created_at));
      expect(new Date(result.body[0].updated_at)).toEqual(new Date(user1.updated_at));
      expect(result.body[0].deleted_at).toBeUndefined();
      expect(result.body[1].id).toBe(user2.id);
      expect(result.body[1].name).toBe(user2.name);
      expect(result.body[1].surname).toBe(user2.surname);
      expect(result.body[1].username).toBe(user2.username);
      expect(result.body[1].role).toBe(user2.role);
      expect(result.body[1].status).toBe(user2.status);
      expect(result.body[1].email).toBe(user2.email);
      expect(new Date(result.body[1].created_at)).toEqual(new Date(user2.created_at));
      expect(new Date(result.body[1].updated_at)).toEqual(new Date(user2.updated_at));
      expect(result.body[1].deleted_at).toBeUndefined();
    });

    test('Get by id', async () => {
      const result = await supertest(http.http)
        .get(`/api/users/${user1.id}`)
        .set('Authorization', bearerToken);
      expect(result.status).toBe(200);
      expect(result.body.id).toBe(user1.id);
      expect(result.body.name).toBe(user1.name);
      expect(result.body.surname).toBe(user1.surname);
      expect(result.body.username).toBe(user1.username);
      expect(result.body.role).toBe(user1.role);
      expect(result.body.status).toBe(user1.status);
      expect(result.body.email).toBe(user1.email);
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
        password: user3.password,
        email: user3.email
      };
      const result = await supertest(http.http)
        .post(`/api/auth/users/`)
        .send(input);
      expect(result.status).toBe(201);
      expect(result.body.id).toBe(1);
      expect(result.body.name).toBe(user3.name);
      expect(result.body.surname).toBe(user3.surname);
      expect(result.body.username).toBe(user3.username);
      expect(result.body.role).toBe(user3.role);
      expect(result.body.email).toBe(user3.email);
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
        password: 'password updated',
        email:    'email@updated.com'
      };
      const result = await supertest(http.http)
        .put(`/api/users/${user2.id}`)
        .set('Authorization', bearerToken)
        .send(input);
      expect(result.status).toBe(200);
      expect(result.body.id).toBe(user2.id);
      expect(result.body.name).toBe(input.name);
      expect(result.body.surname).toBe(input.surname);
      expect(result.body.username).toBe(input.username);
      expect(result.body.role).toBe(user2.role);
      expect(result.body.status).toBe(input.status);
      expect(result.body.email).toBe(input.email);
      expect(new Date(result.body.created_at)).toBeInstanceOf(Date)
      expect(new Date(result.body.updated_at)).toBeInstanceOf(Date)
    });

    test('Delete user', async () => {
      const result = await supertest(http.http)
        .delete(`/api/users/${user2.id}`)
        .set('Authorization', bearerToken);
      expect(result.status).toBe(200);
      expect(result.body).toBeTruthy();
    });
  });

  describe('Trainer', () => {
    beforeAll(async () => {
      trainer1.addAthlete(athlete1);
      await userRepository.save(trainer1);
      await userRepository.save(athlete1);
    });

    test('Get all', async () => {
      const trainerAthletes = [{ id: athlete1.id, name: athlete1.name, surname: athlete1.surname }];

      const result = await supertest(http.http)
        .get('/api/trainers/')
        .set('Authorization', bearerToken);
      expect(result.status).toBe(200);
      expect(result.body).toHaveLength(1);
      expect(result.body[0].id).toBe(trainer1.id);
      expect(result.body[0].name).toBe(trainer1.name);
      expect(result.body[0].surname).toBe(trainer1.surname);
      expect(result.body[0].username).toBe(trainer1.username);
      expect(result.body[0].role).toBe(trainer1.role);
      expect(result.body[0].status).toBe(trainer1.status);
      expect(result.body[0].email).toBe(trainer1.email);
      expect(new Date(result.body[0].created_at)).toEqual(new Date(trainer1.created_at));
      expect(new Date(result.body[0].updated_at)).toEqual(new Date(trainer1.updated_at));
      expect(result.body[0].deleted_at).toBeUndefined();
      expect(result.body[0].register).toBe(trainer1.register);
      expect(result.body[0].plan).toBe(trainer1.plan);
      expect(result.body[0].athletes_limit).toBe(trainer1.athletes_limit);
      expect(result.body[0].athletes_total).toBe(trainer1.athletes.length);
      expect(result.body[0].last_remove_date).toEqual(trainer1.last_remove_date);
    });

    test('Get by id', async () => {
      const trainerAthletes = [{ id: athlete1.id, name: athlete1.name, surname: athlete1.surname }];
      const result = await supertest(http.http)
        .get(`/api/trainers/${trainer1.id}`)
        .set('Authorization', bearerToken);

      expect(result.status).toBe(200);
      expect(result.body.id).toBe(trainer1.id);
      expect(result.body.name).toBe(trainer1.name);
      expect(result.body.surname).toBe(trainer1.surname);
      expect(result.body.username).toBe(trainer1.username);
      expect(result.body.role).toBe(trainer1.role);
      expect(result.body.email).toBe(trainer1.email);
      expect(result.body.status).toBe(trainer1.status);
      expect(new Date(result.body.created_at)).toEqual(new Date(trainer1.created_at));
      expect(new Date(result.body.updated_at)).toEqual(new Date(trainer1.updated_at));
      expect(result.body.deleted_at).toBeUndefined();
      expect(result.body.register).toBe(trainer1.register);
      expect(result.body.plan).toBe(trainer1.plan);
      expect(result.body.athletes_limit).toBe(trainer1.athletes_limit);
      expect(result.body.athletes).toEqual(trainerAthletes);
      expect(result.body.last_remove_date).toEqual(trainer1.last_remove_date);
    });

    test('Create', async () => {
      const trainer2 = generateTrainer(99);
      const input = {
        name: trainer2.name,
        surname: trainer2.surname,
        username: trainer2.username,
        role: trainer2.role,
        password: trainer2.password,
        email: trainer2.email,
        register: trainer2.register
      };
      const result = await supertest(http.http)
        .post(`/api/auth/trainers/`)
        .send(input);
      expect(result.status).toBe(201);
      expect(result.body.id).toBe(1);
      expect(result.body.name).toBe(trainer2.name);
      expect(result.body.surname).toBe(trainer2.surname);
      expect(result.body.username).toBe(trainer2.username);
      expect(result.body.role).toBe(trainer2.role);
      expect(result.body.email).toBe(trainer2.email);
      expect(result.body.status).toBe(trainer2.status);
      expect(new Date(result.body.created_at)).toBeInstanceOf(Date)
      expect(new Date(result.body.updated_at)).toBeInstanceOf(Date)
      expect(result.body.register).toBe(trainer2.register);
    });

    test('Update', async () => {
      const input = {
        name:           'name updated',
        surname:        'surname updated',
        status:         false,
        username:       'username updated',
        password:       'password updated',
        email:          'email@update.com',
        register:       'ce-9999',
        plan:           'PAID',
        athletes_limit: 50
      };
      const result = await supertest(http.http)
        .put(`/api/trainers/${trainer1.id}`)
        .set('Authorization', bearerToken)
        .send(input);
      expect(result.status).toBe(200);
      expect(result.body.id).toBe(trainer1.id);
      expect(result.body.name).toBe(input.name);
      expect(result.body.surname).toBe(input.surname);
      expect(result.body.username).toBe(input.username);
      expect(result.body.role).toBe(trainer1.role);
      expect(result.body.email).toBe(input.email);
      expect(result.body.status).toBe(input.status);
      expect(new Date(result.body.created_at)).toBeInstanceOf(Date)
      expect(new Date(result.body.updated_at)).toBeInstanceOf(Date)
      expect(result.body.register).toBe(input.register);
      expect(result.body.plan).toBe(input.plan);
      expect(result.body.athletes_limit).toBe(input.athletes_limit);
    });
  });

  describe('Athlete', () => {
    test('Get all', async () => {
      const trainerAthletes = [{ id: athlete1.id, name: athlete1.name, surname: athlete1.surname }];

      const result = await supertest(http.http)
        .get('/api/athletes/')
        .set('Authorization', bearerToken);
      expect(result.status).toBe(200);
      expect(result.body).toHaveLength(1);
      expect(result.body[0].id).toBe(athlete1.id);
      expect(result.body[0].name).toBe(athlete1.name);
      expect(result.body[0].surname).toBe(athlete1.surname);
      expect(result.body[0].username).toBe(athlete1.username);
      expect(result.body[0].role).toBe(athlete1.role);
      expect(result.body[0].status).toBe(athlete1.status);
      expect(result.body[0].email).toBe(athlete1.email);
      expect(new Date(result.body[0].created_at)).toEqual(new Date(athlete1.created_at));
      expect(new Date(result.body[0].updated_at)).toEqual(new Date(athlete1.updated_at));
      expect(result.body[0].deleted_at).toBeUndefined();
      expect(result.body[0].has_trainer).toBeTruthy();
    });

    test('Get by id', async () => {
      const athleteTrainer = { id: trainer1.id, name: trainer1.name, surname: trainer1.surname };
      const result = await supertest(http.http)
        .get(`/api/athletes/${athlete1.id}`)
        .set('Authorization', bearerToken);

      expect(result.status).toBe(200);
      expect(result.body.id).toBe(athlete1.id);
      expect(result.body.name).toBe(athlete1.name);
      expect(result.body.surname).toBe(athlete1.surname);
      expect(result.body.username).toBe(athlete1.username);
      expect(result.body.role).toBe(athlete1.role);
      expect(result.body.email).toBe(athlete1.email);
      expect(result.body.status).toBe(athlete1.status);
      expect(new Date(result.body.created_at)).toEqual(new Date(athlete1.created_at));
      expect(new Date(result.body.updated_at)).toEqual(new Date(athlete1.updated_at));
      expect(result.body.deleted_at).toBeUndefined();
      expect(result.body.trainer).toEqual(athleteTrainer);
    });

    test('Create', async () => {
      const athlete2 = generateAthlete(99);
      const input = {
        name: athlete2.name,
        surname: athlete2.surname,
        username: athlete2.username,
        role: athlete2.role,
        password: athlete2.password,
        email: athlete2.email
      };
      const result = await supertest(http.http)
        .post(`/api/auth/athletes/`)
        .send(input);
      expect(result.status).toBe(201);
      expect(result.body.id).toBe(1);
      expect(result.body.name).toBe(athlete2.name);
      expect(result.body.surname).toBe(athlete2.surname);
      expect(result.body.username).toBe(athlete2.username);
      expect(result.body.role).toBe(athlete2.role);
      expect(result.body.email).toBe(athlete2.email);
      expect(result.body.status).toBe(athlete2.status);
      expect(new Date(result.body.created_at)).toBeInstanceOf(Date)
      expect(new Date(result.body.updated_at)).toBeInstanceOf(Date)
      expect(result.body.trainer).toBeUndefined();
    });

    test('Update', async () => {
      const input = {
        name:           'name updated',
        surname:        'surname updated',
        status:         false,
        username:       'username updated',
        password:       'password updated',
        email:          'email@update.com'
      };
      const result = await supertest(http.http)
        .put(`/api/athletes/${athlete1.id}`)
        .set('Authorization', bearerToken)
        .send(input);
      expect(result.status).toBe(200);
      expect(result.body.id).toBe(athlete1.id);
      expect(result.body.name).toBe(input.name);
      expect(result.body.surname).toBe(input.surname);
      expect(result.body.username).toBe(input.username);
      expect(result.body.role).toBe(athlete1.role);
      expect(result.body.email).toBe(input.email);
      expect(result.body.status).toBe(input.status);
      expect(new Date(result.body.created_at)).toBeInstanceOf(Date)
      expect(new Date(result.body.updated_at)).toBeInstanceOf(Date)
      expect(result.body.has_trainer).toBe(!!athlete1.trainer);
    });
  });
});

describe('Failure cases', () => {
  test('Fail on get by nonexistent id', async () => {
    const result = await supertest(http.http)
      .get('/api/users/5')
      .set('Authorization', bearerToken);
    expect(result.status).toBe(404);
    expect(result.body).toBe('User not found by id 5');
  });

  test('Fail on create user without role', async () => {
    const user3 = generateUser(3);
    const input = { password: '1234' };
    const result = await supertest(http.http)
      .post(`/api/auth/users/`)
      .send(input);
    expect(result.status).toBe(403);
    expect(result.body).toBe('User role must be Admin, Trainer or Athlete.');
  });

  test('Fail on create user without password', async () => {
    const user3 = generateUser(3);
    const input = {};
    const result = await supertest(http.http)
      .post(`/api/auth/users/`)
      .send(input);
    expect(result.status).toBe(403);
    expect(result.body).toBe('Password must be provided.');
  });

  test('Fail on delete user by nonexistent id', async () => {
    const result = await supertest(http.http)
      .delete('/api/users/5')
      .set('Authorization', bearerToken);
    expect(result.status).toBe(404);
    expect(result.body).toBe('User not found by id 5');
  });
});

