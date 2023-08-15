import User from '../../../../src/domain/entity/User';
import IUserRepository from '../../../../src/domain/repository/IUserRepository';
import RepositoryFactoryMemory from '../../../../src/infra/factory/RepositoryFactoryMemory';
import Delete from '../../../../src/application/user/Delete';
import { generateUser } from '../../../seeds/user';

let user: User;
let userRepository: IUserRepository;

beforeAll(async () => {
  user = generateUser(1);

  const repositoryFactory = new RepositoryFactoryMemory();
  userRepository = repositoryFactory.userRepository();
  await userRepository.save(user);
});

describe('Successful cases', () => {
  test('Delete', async () => {
    const deleteAction = new Delete(userRepository);
    const userHasDeleted = await deleteAction.execute(user.id);
    const users = await userRepository.getAll();

    expect(userHasDeleted).toBeTruthy();
    expect(users.length).toBe(0);
  });
});

describe('Successful cases', () => {
  test('Fail on delete user that doesnt exists', async () => {
    const deleteAction = new Delete(userRepository);
    expect(() => deleteAction.execute(3))
      .rejects
      .toThrow('User not found by id 3');
  });
});

