import Login from '../../../../src/application/auth/Login';
import JWTAdapter from '../../../../src/infra/token/JWTAdapter';
import RepositoryFactoryMemory from '../../../../src/infra/factory/RepositoryFactoryMemory';
import User from '../../../../src/domain/entity/users/User';
import Trainer from '../../../../src/domain/entity/users/Trainer';
import Athlete from '../../../../src/domain/entity/users/Athlete';
import CryptoAdapter from '../../../../src/infra/crypto/CryptoAdapter';
import { generateUser } from '../../../seeds/user';

import * as dotenv from 'dotenv';

dotenv.config();

let login: Login;
let user: User;
let trainer: Trainer;
let athlete: Athlete;

beforeAll(async () => {
  const token = new JWTAdapter();
  const crypto = new CryptoAdapter();

  const repositoryFactory = new RepositoryFactoryMemory();
  const userRepository    = repositoryFactory.userRepository();
  user = generateUser(1);
  user.password = crypto.encrypt(user.password);
  user = await userRepository.save(user);

  login = new Login(token, crypto, userRepository);
});

describe('Successful cases', () => {
  test('Login as user(admin) with username', async () => {
    const input = {
      login:    user.username,
      password: `password${user.id}`
    };

    const result = await login.execute(input);

    expect(result).toHaveLength(271);
  });

  test('Login as user(admin) with email', async () => {
    const input = {
      login:    user.email,
      password: `password${user.id}`
    };

    const result = await login.execute(input);

    expect(result).toHaveLength(271);
  });

  test('Login as user(admin) with TTL', async () => {
    const input = {
      login:    user.username,
      password: `password${user.id}`
    };

    const result = await login.execute(input, 1000);

    expect(result).toHaveLength(293);
  });
});

