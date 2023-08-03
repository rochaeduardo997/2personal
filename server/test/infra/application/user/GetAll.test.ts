import User from '../../../../src/domain/entity/User';
import IUserRepository from '../../../../src/domain/repository/IUserRepository';
import RepositoryFactoryMemory from '../../../../src/infra/factory/RepositoryFactoryMemory';
import GetAll from '../../../../src/application/user/GetAll';

let user1: User;
let user2: User;
let user3: User;
let userRepository: IUserRepository;

beforeAll(async () => {
  user1 = new User(1, 'name',  'surname',  'username1',  'password',  'admin', true);
  user2 = new User(2, 'name',  'surname',  'username2',  'password',  'admin', true);
  user3 = new User(3, 'name',  'surname',  'username3',  'password',  'admin', true);

  const repositoryFactory = new RepositoryFactoryMemory();
  userRepository          = repositoryFactory.userRepository();

  await userRepository.save(user1);
  await userRepository.save(user2);
  await userRepository.save(user3);
});

test('Must get all users', async () => {
  const getAll = new GetAll(userRepository);
  const users = await getAll.execute();

  expect(users.length).toBe(3);
  expect(users).toEqual([ user1, user2, user3 ]);
});

