import User from '../../../../../src/domain/entity/users/User';
import IUserRepository from '../../../../../src/domain/repository/users/IUserRepository';
import RepositoryFactoryMemory from '../../../../../src/infra/factory/RepositoryFactoryMemory';
import Add from '../../../../../src/application/users/user/Add';
import ICrypto from '../../../../../src/infra/crypto/ICrypto';
import CryptoAdapter from '../../../../../src/infra/crypto/CryptoAdapter';
import { generateUser } from '../../../../seeds/user';

import * as dotenv from 'dotenv';

dotenv.config();

let user: User;
let userRepository: IUserRepository;
let crypto: ICrypto;

beforeAll(() => {
  crypto = new CryptoAdapter();

  user = generateUser(1);

  const repositoryFactory = new RepositoryFactoryMemory();
  userRepository = repositoryFactory.userRepository();
});

describe('Successful cases', () => {
  test('Add user', async () => {
    const add = new Add(userRepository, crypto);
    const input = {
      name:     user.name,
      surname:  user.surname,
      username: user.username,
      role:     user.role,
      password: user.password,
      email:    user.email,
    };
    const userData = await add.execute(input);
    expect(userData.id).toBe(user.id);
    expect(userData.name).toBe(user.name);
    expect(userData.surname).toBe(user.surname);
    expect(userData.username).toBe(user.username);
    expect(userData.role).toBe(user.role);
    expect(userData.email).toBe(user.email);
    expect(userData.status).toBe(user.status);
    expect(new Date(userData.created_at)).toBeInstanceOf(Date);
    expect(new Date(userData.updated_at)).toBeInstanceOf(Date);
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
