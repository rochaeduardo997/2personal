import Athlete from '../../../../../src/domain/entity/users/Athlete';
import IUserRepository from '../../../../../src/domain/repository/users/IUserRepository';
import RepositoryFactoryMemory from '../../../../../src/infra/factory/RepositoryFactoryMemory';
import ICrypto from '../../../../../src/infra/crypto/ICrypto';
import CryptoAdapter from '../../../../../src/infra/crypto/CryptoAdapter';
import { generateAthlete } from '../../../../seeds/user';

import * as dotenv from 'dotenv';
import Add from '../../../../../src/application/users/athlete/Add';

dotenv.config();

let athlete: Athlete;
let userRepository: IUserRepository;
let crypto: ICrypto;

beforeAll(() => {
  crypto = new CryptoAdapter();

  athlete = generateAthlete(1);

  const repositoryFactory = new RepositoryFactoryMemory();
  userRepository = repositoryFactory.userRepository();
});

describe('Successful cases', () => {
  test('Add', async () => {
    const add = new Add(userRepository, crypto);
    const input = {
      name:     athlete.name,
      surname:  athlete.surname,
      username: athlete.username,
      role:     athlete.role,
      password: athlete.password,
      email:    athlete.email
    };
    const athleteData = await add.execute(input);
    expect(athleteData.id).toBe(athlete.id);
    expect(athleteData.name).toBe(athlete.name);
    expect(athleteData.surname).toBe(athlete.surname);
    expect(athleteData.username).toBe(athlete.username);
    expect(athleteData.role).toBe(athlete.role);
    expect(athleteData.email).toBe(athlete.email);
    expect(athleteData.status).toBe(athlete.status);
    expect(new Date(athleteData.created_at)).toBeInstanceOf(Date);
    expect(new Date(athleteData.updated_at)).toBeInstanceOf(Date);
    expect(athleteData.trainer).toBe(athlete.trainer);
  });
});

describe('Failure cases', () => {
  test.todo('Fail when try to add without password provided');
});
