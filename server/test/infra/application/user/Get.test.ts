import User from '../../../../src/domain/entity/User';
import IUserRepository from '../../../../src/domain/repository/IUserRepository';
import RepositoryFactoryMemory from '../../../../src/infra/factory/RepositoryFactoryMemory';
import Get from '../../../../src/application/user/Get';

let user: User;
let userRepository: IUserRepository;

beforeAll(() => {
  user = new User(1, 'name',  'surname',  'username',  'password',  'admin', true);

  const repositoryFactory = new RepositoryFactoryMemory();
  userRepository = repositoryFactory.userRepository();
  userRepository.save(user);
});

test('Must get an existing user', async () => {
  const get = new Get(userRepository);
  const userData = await get.execute(user.id);
  expect(userData).toEqual(user);
});

