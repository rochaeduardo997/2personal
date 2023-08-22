import Trainer from '../../../../../src/domain/entity/Trainer';
import IUserRepository from '../../../../../src/domain/repository/IUserRepository';
import RepositoryFactoryMemory from '../../../../../src/infra/factory/RepositoryFactoryMemory';
import ICrypto from '../../../../../src/infra/crypto/ICrypto';
import CryptoAdapter from '../../../../../src/infra/crypto/CryptoAdapter';
import { generateTrainer } from '../../../../seeds/user';

import * as dotenv from 'dotenv';
import Update from '../../../../../src/application/users/trainer/Update';

dotenv.config();

let trainer: Trainer;
let userRepository: IUserRepository;
let crypto: ICrypto;

beforeAll(async () => {
  crypto = new CryptoAdapter();

  trainer = generateTrainer(1);

  const repositoryFactory = new RepositoryFactoryMemory();
  userRepository = repositoryFactory.userRepository();
  trainer = await userRepository.save(trainer);
  trainer.update({
    name:          'name updated',
    surname:       'surname updated',
    register:      '11111-ce',
    status:        false,
    email:         'update@email.com',
    plan:          'free',
    athletes_limit: 5,
    username:       'username updated',
    password:       'password updated'
  });
});

describe('Successful cases', () => {
  test('Update', async () => {
    const update = new Update(userRepository, crypto);
    const trainerUpdated = await update.execute(trainer.id, {
      name:          'name updated',
      surname:       'surname updated',
      register:      '11111-ce',
      status:        false,
      email:         'update@email.com',
      plan:          'free',
      athletes_limit: 5,
      username:       'username updated',
      password:       'password updated'
    });

    expect(trainerUpdated.id).toBe(trainer.id);
    expect(trainerUpdated.name).toBe(trainer.name);
    expect(trainerUpdated.surname).toBe(trainer.surname);
    expect(trainerUpdated.username).toBe(trainer.username);
    expect(trainerUpdated.role).toBe(trainer.role);
    expect(trainerUpdated.email).toBe(trainer.email);
    expect(trainerUpdated.status).toBe(trainer.status);
    expect(new Date(trainerUpdated.created_at)).toBeInstanceOf(Date);
    expect(new Date(trainerUpdated.updated_at)).toBeInstanceOf(Date);
    expect(trainerUpdated.register).toBe(trainer.register);
    expect(trainerUpdated.plan).toBe(trainer.plan);
    expect(trainerUpdated.athletes_limit).toBe(trainer.athletes_limit);
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

