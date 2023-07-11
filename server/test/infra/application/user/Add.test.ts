import User from '../../../../src/domain/entity/User';
import IUserRepository from '../../../../src/domain/repository/IUserRepository';
import RepositoryFactoryMemory from '../../../../src/infra/factory/RepositoryFactoryMemory';
import Add from '../../../../src/application/user/Add';

let user: User;
let userRepository: IUserRepository;

beforeAll(() => {
  user = new User(1, 'name',  'surname',  'username',  'password',  'admin', true);

  const repositoryFactory = new RepositoryFactoryMemory();
  userRepository = repositoryFactory.userRepository();
});

test('Must add a new user', async () => {
  const add = new Add(userRepository);
  const userData = await add.execute(user);
  expect(userData).toEqual(user);
});

