import GetAll from "../../../../../src/application/users/user/GetAll";
import User from "../../../../../src/domain/entity/User";
import IUserRepository from "../../../../../src/domain/repository/IUserRepository";
import RepositoryFactoryMemory from "../../../../../src/infra/factory/RepositoryFactoryMemory";
import { generateUser } from "../../../../seeds/user";

let user1: User;
let user2: User;
let userRepository: IUserRepository;

beforeAll(async () => {
  user1 = generateUser(1);
  user2 = generateUser(2);

  const repositoryFactory = new RepositoryFactoryMemory();
  userRepository          = repositoryFactory.userRepository();

  await userRepository.save(user1);
  await userRepository.save(user2);
});

test('Get all', async () => {
  const getAll = new GetAll(userRepository);
  const users  = await getAll.execute();

  expect(users).toHaveLength(2);
  expect(users[0].id).toBe(user1.id);
  expect(users[0].name).toBe(user1.name);
  expect(users[0].surname).toBe(user1.surname);
  expect(users[0].username).toBe(user1.username);
  expect(users[0].role).toBe(user1.role);
  expect(users[0].email).toBe(user1.email);
  expect(users[0].status).toBe(user1.status);
  expect(new Date(users[0].created_at)).toEqual(new Date(user1.created_at));
  expect(new Date(users[0].updated_at)).toEqual(new Date(user1.updated_at));
  expect(users[1].deleted_at).toBeUndefined();
  expect(users[1].id).toBe(user2.id);
  expect(users[1].name).toBe(user2.name);
  expect(users[1].surname).toBe(user2.surname);
  expect(users[1].username).toBe(user2.username);
  expect(users[1].role).toBe(user2.role);
  expect(users[1].email).toBe(user2.email);
  expect(users[1].status).toBe(user2.status);
  expect(new Date(users[1].created_at)).toEqual(new Date(user2.created_at));
  expect(new Date(users[1].updated_at)).toEqual(new Date(user2.updated_at));
  expect(users[1].deleted_at).toBeUndefined();
});

