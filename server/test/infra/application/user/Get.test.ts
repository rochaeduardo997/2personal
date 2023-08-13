import User from '../../../../src/domain/entity/User';
import IUserRepository from '../../../../src/domain/repository/IUserRepository';
import RepositoryFactoryMemory from '../../../../src/infra/factory/RepositoryFactoryMemory';
import Get from '../../../../src/application/user/Get';
import { generateUser } from '../../../seeds/user';

let user: User;
let userRepository: IUserRepository;

beforeAll(() => {
  user = generateUser(1);

  const repositoryFactory = new RepositoryFactoryMemory();
  userRepository = repositoryFactory.userRepository();
  userRepository.save(user);
});

test('Must get an existing user', async () => {
  const get = new Get(userRepository);
  const userData = await get.execute(user.id);
  expect(userData.id).toBe(user.id);
  expect(userData.name).toBe(user.name);
  expect(userData.surname).toBe(user.surname);
  expect(userData.username).toBe(user.username);
  expect(userData.role).toBe(user.role);
  expect(userData.email).toBe(user.email);
  expect(userData.status).toBe(user.status);
  expect(new Date(userData.created_at)).toEqual(new Date(user.created_at));
  expect(new Date(userData.updated_at)).toEqual(new Date(user.updated_at));
  expect(userData.deleted_at).toEqual(user.deleted_at);
});

