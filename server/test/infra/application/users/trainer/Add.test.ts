import Trainer from '../../../../../src/domain/entity/users/Trainer';
import IUserRepository from '../../../../../src/domain/repository/users/IUserRepository';
import RepositoryFactoryMemory from '../../../../../src/infra/factory/RepositoryFactoryMemory';
import ICrypto from '../../../../../src/infra/crypto/ICrypto';
import CryptoAdapter from '../../../../../src/infra/crypto/CryptoAdapter';
import { generateTrainer } from '../../../../seeds/user';

import * as dotenv from 'dotenv';
import Add from '../../../../../src/application/users/trainer/Add';

dotenv.config();

let trainer: Trainer;
let userRepository: IUserRepository;
let crypto: ICrypto;

beforeAll(() => {
  crypto = new CryptoAdapter();

  trainer = generateTrainer(1);

  const repositoryFactory = new RepositoryFactoryMemory();
  userRepository = repositoryFactory.userRepository();
});

describe('Successful cases', () => {
  test('Add trainer', async () => {
    const add = new Add(userRepository, crypto);
    const input = {
      name:     trainer.name,
      surname:  trainer.surname,
      username: trainer.username,
      role:     trainer.role,
      password: trainer.password,
      email:    trainer.email,
      register: trainer.register
    };
    const trainerData = await add.execute(input);
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
  test('Fail when try to add without password provided', async () => {
    const add = new Add(userRepository, crypto);
    //@ts-ignore
    expect(() => add.execute({}))
      .rejects
      .toThrow('Password must be provided');
  });
});
