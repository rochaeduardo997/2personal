import User from '../../../../src/domain/entity/User';
import IUserRepository from '../../../../src/domain/repository/IUserRepository';
import RepositoryFactoryMemory from '../../../../src/infra/factory/RepositoryFactoryMemory';
import Add from '../../../../src/application/user/Add';
import { generateUser } from '../../../seeds/user';

let user: User;
let userRepository: IUserRepository;

beforeAll(() => {
  user = generateUser(1);

  const repositoryFactory = new RepositoryFactoryMemory();
  userRepository = repositoryFactory.userRepository();
});

test('Must add a new user', async () => {
  const add = new Add(userRepository);
  const input = {
    name:     user.name,
    surname:  user.surname,
    username: user.username,
    role:     user.role,
    password: user.password
  };
  const userData = await add.execute(input);
  expect(userData.id).toBe(user.id);
  expect(userData.name).toBe(user.name);
  expect(userData.surname).toBe(user.surname);
  expect(userData.username).toBe(user.username);
  expect(userData.role).toBe(user.role);
  expect(userData.status).toBe(user.status);
  expect(new Date(userData.created_at).toISOString).toEqual(new Date(user.created_at).toISOString);
  expect(new Date(userData.updated_at).toISOString).toEqual(new Date(user.updated_at).toISOString);
});
