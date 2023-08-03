import User from '../../../../src/domain/entity/User';
import IUserRepository from '../../../../src/domain/repository/IUserRepository';
import RepositoryFactoryMemory from '../../../../src/infra/factory/RepositoryFactoryMemory';
import Update from '../../../../src/application/user/Update';

let user: User;
let userData: User;
let userRepository: IUserRepository;

beforeAll(async () => {
  user = new User(1, 'name',  'surname',  'username',  'password',  'admin', true);

  const repositoryFactory = new RepositoryFactoryMemory();
  userRepository = repositoryFactory.userRepository();
  userData = await userRepository.save(user);
  userData.update({
    name:     'name updated',
    surname:  'surname updated',
    status:   false,
    username: 'username updated',
    password: 'password updated'
  });
});

test('Must update an existing user', async () => {
  const update = new Update(userRepository);
  const userUpdated = await update.execute(userData.id, {
    name:     'name updated',
    surname:  'surname updated',
    status:   false,
    username: 'username updated',
    password: 'password updated'
  });

  expect(userUpdated).toEqual(userData);
});

