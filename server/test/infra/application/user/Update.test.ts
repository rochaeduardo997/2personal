import User from '../../../../src/domain/entity/User';
import IUserRepository from '../../../../src/domain/repository/IUserRepository';
import RepositoryFactoryMemory from '../../../../src/infra/factory/RepositoryFactoryMemory';
import Update from '../../../../src/application/user/Update';
import { generateUser } from '../../../seeds/user';
import ICrypto from '../../../../src/infra/crypto/ICrypto';
import CryptoAdapter from '../../../../src/infra/crypto/CryptoAdapter';

import * as dotenv from 'dotenv';

dotenv.config();

let user: User;
let userData: User;
let userRepository: IUserRepository;
let crypto: ICrypto;

beforeAll(async () => {
  crypto = new CryptoAdapter();

  user = generateUser(1);

  const repositoryFactory = new RepositoryFactoryMemory();
  userRepository = repositoryFactory.userRepository();
  userData = await userRepository.save(user);
  userData.update({
    name:     'name updated',
    surname:  'surname updated',
    status:   false,
    username: 'username updated',
    password: 'password updated',
    email:    'update@email.com'
  });
});

test('Must update an existing user', async () => {
  const update = new Update(userRepository, crypto);
  const userUpdated = await update.execute(userData.id, {
    name:     'name updated',
    surname:  'surname updated',
    status:   false,
    username: 'username updated',
    password: 'password updated',
    email:    'update@email.com'
  });

  expect(userUpdated.id).toBe(user.id);
  expect(userUpdated.name).toBe(user.name);
  expect(userUpdated.surname).toBe(user.surname);
  expect(userUpdated.username).toBe(user.username);
  expect(userUpdated.role).toBe(user.role);
  expect(userUpdated.email).toBe(user.email);
  expect(userUpdated.status).toBe(user.status);
  expect(new Date(userUpdated.created_at)).toEqual(new Date(user.created_at));
  expect(new Date(userUpdated.updated_at)).toEqual(new Date(user.updated_at));
});

