import Trainer from '../../../../src/domain/entity/Trainer';
import IUserRepository from '../../../../src/domain/repository/IUserRepository';
import RepositoryFactoryMemory from '../../../../src/infra/factory/RepositoryFactoryMemory';
import Delete from '../../../../src/application/trainer/Delete';
import { generateTrainer } from '../../../seeds/user';

let trainer: Trainer;
let userRepository: IUserRepository;

beforeAll(async () => {
  trainer = generateTrainer(1);

  const repositoryFactory = new RepositoryFactoryMemory();
  userRepository = repositoryFactory.userRepository();
  await userRepository.save(trainer);
});

describe('Successful cases', () => {
  test('Delete', async () => {
    const deleteAction = new Delete(userRepository);
    const userHasDeleted = await deleteAction.execute(trainer.id);
    const users = await userRepository.getAll();

    expect(userHasDeleted).toBeTruthy();
    expect(users.length).toBe(0);
  });
});

describe('Failure cases', () => {
  test('Fail on delete user that doesnt exists', async () => {
    const deleteAction = new Delete(userRepository);
    expect(() => deleteAction.execute(3))
      .rejects
      .toThrow('User not found by id 3');
  });
});

