import Trainer from '../../../../src/domain/entity/Trainer';
import IUserRepository from '../../../../src/domain/repository/IUserRepository';
import RepositoryFactoryMemory from '../../../../src/infra/factory/RepositoryFactoryMemory';
import Update from '../../../../src/application/trainer/Update';
import ICrypto from '../../../../src/infra/crypto/ICrypto';
import CryptoAdapter from '../../../../src/infra/crypto/CryptoAdapter';
import { generateTrainer } from '../../../seeds/user';

import * as dotenv from 'dotenv';

dotenv.config();

let trainer: Trainer;
let trainerData: Trainer;
let userRepository: IUserRepository;
let crypto: ICrypto;

beforeAll(async () => {
  crypto = new CryptoAdapter();

  trainer = generateTrainer(1);

  const repositoryFactory = new RepositoryFactoryMemory();
  userRepository = repositoryFactory.userRepository();
  trainerData = await userRepository.save(trainer);
  trainerData.update({
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
    const trainerUpdated = await update.execute(trainerData.id, {
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

    expect(trainerData.id).toBe(trainer.id);
    expect(trainerData.name).toBe(trainer.name);
    expect(trainerData.surname).toBe(trainer.surname);
    expect(trainerData.username).toBe(trainer.username);
    expect(trainerData.role).toBe(trainer.role);
    expect(trainerData.email).toBe(trainer.email);
    expect(trainerData.status).toBe(trainer.status);
    expect(new Date(trainerData.created_at)).toBeInstanceOf(Date);
    expect(new Date(trainerData.updated_at)).toBeInstanceOf(Date);
    expect(trainerData.register).toBe(trainer.register);
    expect(trainerData.plan).toBe(trainer.plan);
    expect(trainerData.athletes_limit).toBe(trainer.athletes_limit);
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

