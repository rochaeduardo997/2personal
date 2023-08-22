import Athlete from '../../../../../src/domain/entity/users/Athlete';
import IUserRepository from '../../../../../src/domain/repository/users/IUserRepository';
import RepositoryFactoryMemory from '../../../../../src/infra/factory/RepositoryFactoryMemory';
import ICrypto from '../../../../../src/infra/crypto/ICrypto';
import CryptoAdapter from '../../../../../src/infra/crypto/CryptoAdapter';
import { generateAthlete } from '../../../../seeds/user';

import * as dotenv from 'dotenv';
import Update from '../../../../../src/application/users/athlete/Update';

dotenv.config();

let athlete: Athlete;
let userRepository: IUserRepository;
let crypto: ICrypto;

beforeAll(async () => {
  crypto = new CryptoAdapter();

  athlete = generateAthlete(1);

  const repositoryFactory = new RepositoryFactoryMemory();
  userRepository = repositoryFactory.userRepository();
  athlete = await userRepository.save(athlete);
  athlete.update({
    name:          'name updated',
    surname:       'surname updated',
    status:        false,
    email:         'update@email.com',
    username:       'username updated',
    password:       'password updated'
  });
});

describe('Successful cases', () => {
  test('Update', async () => {
    const update = new Update(userRepository, crypto);
    const athleteUpdated = await update.execute(athlete.id, {
      name:          'name updated',
      surname:       'surname updated',
      status:        false,
      email:         'update@email.com',
      username:       'username updated',
      password:       'password updated'
    });

    expect(athleteUpdated.id).toBe(athlete.id);
    expect(athleteUpdated.name).toBe(athlete.name);
    expect(athleteUpdated.surname).toBe(athlete.surname);
    expect(athleteUpdated.username).toBe(athlete.username);
    expect(athleteUpdated.role).toBe(athlete.role);
    expect(athleteUpdated.email).toBe(athlete.email);
    expect(athleteUpdated.status).toBe(athlete.status);
    expect(new Date(athleteUpdated.created_at)).toBeInstanceOf(Date);
    expect(new Date(athleteUpdated.updated_at)).toBeInstanceOf(Date);
    expect(athleteUpdated.has_trainer).toBe(!!athlete.trainer);
  });
});

describe('Failure cases', () => {
  test('Fail on update user that doesnt exists', async () => {
    const update = new Update(userRepository, crypto);
    expect(() => update.execute(3, {}))
      .rejects
      .toThrow('User not found by id 3');
  });
});

