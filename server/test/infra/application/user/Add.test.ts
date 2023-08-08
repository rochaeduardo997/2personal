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
  const userData = await add.execute(user);
  expect(user.id).toBe(user.id);
  expect(user.name).toBe(user.name);
  expect(user.surname).toBe(user.surname);
  expect(user.username).toBe(user.username);
  expect(user.role).toBe(user.role);
  expect(user.status).toBe(user.status);
  expect(new Date(user.created_at)).toEqual(new Date(user.created_at));
  expect(new Date(user.updated_at)).toEqual(new Date(user.updated_at));
});

