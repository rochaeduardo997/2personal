import User from "../../../src/domain/entity/User";
import IUserRepository from "../../../src/domain/repository/IUserRepository";
import RepositoryFactoryMemory from '../../../src/infra/factory/RepositoryFactoryMemory';

let user1: User;
let user2: User;

beforeAll(() => {
  user1 = new User(1, 'name',  'surname',  'username',  'password',  'admin', true);
  user2 = new User(1, 'name2', 'surname2', 'username2', 'password2', 'admin', true);
});

let repositoryFactory = new RepositoryFactoryMemory();
let userRepository: IUserRepository;

beforeEach(() => {
  prepareMemory();
});

function prepareMemory(){
  userRepository = repositoryFactory.userRepository();
}

describe('Success cases', () => {
  test('Must create a new user and return its informations', async () => {
    const result = await userRepository.save(user1);
    await userRepository.save(user2);
    expect(result.id).toBe(user1.id);
    expect(result.name).toBe(user1.name);
    expect(result.surname).toBe(user1.surname);
    expect(result.fullname).toBe(user1.fullname);
    expect(result.username).toBe(user1.username);
    expect(result.password).toBe(user1.password);
    expect(result.role).toBe(user1.role);
    expect(result.status).toBe(user1.status);
    expect(result.created_at).toBe(user1.created_at);
    expect(result.updated_at).toBe(user1.updated_at);
    expect(result.deleted_at).toBe(user1.deleted_at);
  });

  test('Must get user informations by user id', async () => {
    const result = await userRepository.save(user1);
    await userRepository.save(user2);
    expect(result.id).toBe(user1.id);
    expect(result.name).toBe(user1.name);
    expect(result.surname).toBe(user1.surname);
    expect(result.fullname).toBe(user1.fullname);
    expect(result.username).toBe(user1.username);
    expect(result.password).toBe(user1.password);
    expect(result.role).toBe(user1.role);
    expect(result.status).toBe(user1.status);
    expect(result.created_at).toBe(user1.created_at);
    expect(result.updated_at).toBe(user1.updated_at);
    expect(result.deleted_at).toBe(user1.deleted_at);
  });

  test('Must get all users', async () => {
    await userRepository.save(user1);
    await userRepository.save(user2);
    const [ first, second ] = await userRepository.getAll();
    expect(first).toEqual(user1);
    expect(second).toEqual(user2);
  });

  test('Must delete user by id', async () => {
    const userData = await userRepository.save(user1);
    const userData2 = await userRepository.save(user2);
    const result = await userRepository.delete(userData.id);
    const users = await userRepository.getAll();
    expect(result).toBeTruthy();
    expect(users).toHaveLength(1);
    expect(users[0]).toEqual(userData2);
    expect(users[1]).toBeUndefined();
  });

  test('Must update an existing user and return its new informations', async () => {
    const userData1 = await userRepository.save(user1);
    await userRepository.save(user2);
    userData1.update({ 
      name:     'name updated',
      surname:  'surname updated',
      status:   false,
      username: 'username updated',
      password: 'password updated'
    });
    const [ first, second ] = await userRepository.getAll();
    expect(first).toEqual(userData1);
    expect(second).toEqual(user2);
  });
});

describe('Fail cases', () => {
});

