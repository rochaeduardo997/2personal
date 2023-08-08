import User from '../../../../src/domain/entity/User';
import IUserRepository from '../../../../src/domain/repository/IUserRepository';
import RepositoryFactoryMemory from '../../../../src/infra/factory/RepositoryFactoryMemory';
import Update from '../../../../src/application/user/Update';
import { generateUser } from '../../../seeds/user';

let user: User;
let userData: User;
let userRepository: IUserRepository;

beforeAll(async () => {
  user = generateUser(1);

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

  expect(userUpdated.id).toBe(user.id);
  expect(userUpdated.name).toBe(user.name);
  expect(userUpdated.surname).toBe(user.surname);
  expect(userUpdated.username).toBe(user.username);
  expect(userUpdated.role).toBe(user.role);
  expect(userUpdated.status).toBe(user.status);
  expect(new Date(userUpdated.created_at)).toEqual(new Date(user.created_at));
  expect(new Date(userUpdated.updated_at)).toEqual(new Date(user.updated_at));
});

