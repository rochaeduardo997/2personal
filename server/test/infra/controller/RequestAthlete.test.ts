import IHttp from '../../../src/infra/http/IHttp';
import ExpressAdapter from '../../../src/infra/http/ExpressAdapter';
import Trainer from '../../../src/domain/entity/Trainer';
import Athlete from '../../../src/domain/entity/Athlete';
import RequestAthlete from '../../../src/domain/entity/RequestAthlete';
import RepositoryFactoryMemory from '../../../src/infra/factory/RepositoryFactoryMemory';
import RequestAthleteController from '../../../src/infra/controller/RequestAthleteController';
import CryptoAdapter from '../../../src/infra/crypto/CryptoAdapter';
import JWTAdapter from '../../../src/infra/token/JWTAdapter';
import { generateTrainer, generateAthlete } from '../../seeds/user';
import { generateToken } from '../../seeds/token';
import { generateRequestAthlete } from '../../seeds/requestAthlete';

import supertest from 'supertest';
import * as dotenv from 'dotenv';

dotenv.config();

let http: IHttp;

let trainer1: Trainer;
let trainer2: Trainer;
let athlete1: Athlete;
let athlete2: Athlete;
let requestAthlete1: RequestAthlete;
let requestAthlete2: RequestAthlete;

let athleteBearerToken: string;
let trainerBearerToken: string;

async function prepareController(http: IHttp){
  const repositoryFactory        = new RepositoryFactoryMemory();
  const userRepository           = repositoryFactory.userRepository();
  const requestAthleteRepository = repositoryFactory.requestAthleteRepository();

  const crypto = new CryptoAdapter();

  trainer1 = generateTrainer(1);
  trainer2 = generateTrainer(2);
  athlete1 = generateAthlete(3);
  athlete2 = generateAthlete(4);

  requestAthlete1 = generateRequestAthlete(1, trainer1, athlete1);
  requestAthlete2 = generateRequestAthlete(2, trainer2, athlete1);

  athleteBearerToken = `Bearer ${await generateToken(athlete1)}`;
  trainerBearerToken = `Bearer ${await generateToken(trainer1)}`;

  await userRepository.save(trainer1);
  await userRepository.save(athlete1);
  await userRepository.save(athlete2);

  await requestAthleteRepository.make(requestAthlete1);
  await requestAthleteRepository.make(requestAthlete2);

  new RequestAthleteController('requestAthlete', http, userRepository, requestAthleteRepository);
}

beforeAll(async () => {
  const token = new JWTAdapter();
  http = new ExpressAdapter(token);
  await prepareController(http);
  http.setupRouters();
});

describe('Successful cases', () => {
  describe('Athlete', () => {
    test('Get all by athlete', async () => {
      const result = await supertest(http.http)
        .get('/api/requestAthlete/athlete/')
        .set('Authorization', athleteBearerToken);
      expect(result.status).toBe(200);
      expect(result.body).toHaveLength(2);
      expect(result.body[0].id).toBe(requestAthlete1.id);
      expect(result.body[0].trainer_id).toBe(trainer1.id);
      expect(result.body[0].athlete_id).toBe(athlete1.id);
      expect(result.body[0].was_accepted).toBe(requestAthlete1.was_accepted);
      expect(result.body[1].id).toBe(requestAthlete2.id);
      expect(result.body[1].trainer_id).toBe(trainer2.id);
      expect(result.body[1].athlete_id).toBe(athlete1.id);
      expect(result.body[1].was_accepted).toBe(requestAthlete2.was_accepted);
    });
  });

  describe('Trainer', () => {
    test('Get all by trainer', async () => {
      const result = await supertest(http.http)
        .get('/api/requestAthlete/trainer/')
        .set('Authorization', trainerBearerToken);
      expect(result.status).toBe(200);
      expect(result.body).toHaveLength(1);
      expect(result.body[0].id).toBe(requestAthlete1.id);
      expect(result.body[0].trainer_id).toBe(trainer1.id);
      expect(result.body[0].athlete_id).toBe(athlete1.id);
      expect(result.body[0].was_accepted).toBe(requestAthlete1.was_accepted);
    });

    test('Make athlete request', async () => {
      const result = await supertest(http.http)
        .get(`/api/requestAthlete/make/${athlete2.id}`)
        .set('Authorization', trainerBearerToken);
      expect(result.status).toBe(201);
      expect(result.body.id).toBe(1);
      expect(result.body.trainer_id).toBe(trainer1.id);
      expect(result.body.athlete_id).toBe(athlete2.id);
      expect(result.body.was_accepted).toBeUndefined();
    });
  })
});

