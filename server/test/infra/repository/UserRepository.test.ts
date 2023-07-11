import User from "../../../src/domain/entity/User";
import IUserRepository from "../../../src/domain/repository/IUserRepository";
import RepositoryFactoryMemory from '../../../src/infra/factory/RepositoryFactoryMemory';

let userRepository: IUserRepository;
let repositoryFactory = new RepositoryFactoryMemory();

let user: User;

beforeAll(() => {
  user = new User(1, 'name', 'surname', 'username', 'password', 'admin', true);
  userRepository = repositoryFactory.userRepository();
});

describe('Success cases', () => {
  test('Must create a new user and return its informations', async () => {
    const result = await userRepository.save(user);
    expect(result.id).toBe(user.id);
    expect(result.name).toBe(user.name);
    expect(result.surname).toBe(user.surname);
    expect(result.fullname).toBe(user.fullname);
    expect(result.username).toBe(user.username);
    expect(result.password).toBe(user.password);
    expect(result.role).toBe(user.role);
    expect(result.status).toBe(user.status);
    expect(result.created_at).toBe(user.created_at);
    expect(result.updated_at).toBe(user.updated_at);
    expect(result.deleted_at).toBe(user.deleted_at);
  });

  test('Must get user informations by user id', async () => {
    const result = await userRepository.get(user.id);
    expect(result.id).toBe(user.id);
    expect(result.name).toBe(user.name);
    expect(result.surname).toBe(user.surname);
    expect(result.fullname).toBe(user.fullname);
    expect(result.username).toBe(user.username);
    expect(result.password).toBe(user.password);
    expect(result.role).toBe(user.role);
    expect(result.status).toBe(user.status);
    expect(result.created_at).toBe(user.created_at);
    expect(result.updated_at).toBe(user.updated_at);
    expect(result.deleted_at).toBe(user.deleted_at);
  });
});

describe('Fail cases', () => {
});

