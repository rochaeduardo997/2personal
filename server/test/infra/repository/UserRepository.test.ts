import User from "../../../src/domain/entity/User";
import Trainer from "../../../src/domain/entity/Trainer";
import Athlete from "../../../src/domain/entity/Athlete";
import IUserRepository from "../../../src/domain/repository/IUserRepository";
import RepositoryFactoryMemory from '../../../src/infra/factory/RepositoryFactoryMemory';
import { generateUser, generateTrainer } from '../../seeds/user';

let user1: User;
let user2: User;

let trainer1: Trainer;
let trainer2: Trainer;

beforeAll(() => {
  user1 = generateUser(1);
  user2 = generateUser(2);

  trainer1 = generateTrainer(3);
  trainer2 = generateTrainer(4);
});

let userRepository: IUserRepository;

beforeEach(() => {
  prepareMemory();
});

function prepareMemory(){
  let repositoryFactory = new RepositoryFactoryMemory();
  userRepository = repositoryFactory.userRepository();
}

describe('Success cases', () => {
  describe('User', () => {
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
      expect(result.email).toBe(user1.email);
      expect(result.status).toBe(user1.status);
      expect(result.created_at).toBe(user1.created_at);
      expect(result.updated_at).toBe(user1.updated_at);
      expect(result.deleted_at).toBe(user1.deleted_at);
    });

    test('Must get user informations by user id', async () => {
      const userData = await userRepository.save(user1);
      await userRepository.save(user2);
      const result = await userRepository.get(userData.id);
      expect(result.id).toBe(user1.id);
      expect(result.name).toBe(user1.name);
      expect(result.surname).toBe(user1.surname);
      expect(result.fullname).toBe(user1.fullname);
      expect(result.username).toBe(user1.username);
      expect(result.password).toBe(user1.password);
      expect(result.role).toBe(user1.role);
      expect(result.email).toBe(user1.email);
      expect(result.status).toBe(user1.status);
      expect(result.created_at).toBe(user1.created_at);
      expect(result.updated_at).toBe(user1.updated_at);
      expect(result.deleted_at).toBe(user1.deleted_at);
    });

    test('Must get all users', async () => {
      await userRepository.save(user1);
      await userRepository.save(user2);
      const [ first, second ] = await userRepository.getAll('admin');
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

    test('Login with username', async () => {
      const userData1 = await userRepository.save(user1);
      await userRepository.save(user2);
      const input = { 
        login:    user1.username,
        password: `password${user1.id}`,
      };
      const result = await userRepository.login(input);
      expect(result).toEqual(user1);
    });

    test('Must update an existing user and return its new informations', async () => {
      const userData1 = await userRepository.save(user1);
      await userRepository.save(user2);
      userData1.update({ 
        name:     'name updated',
        surname:  'surname updated',
        status:   false,
        username: 'username updated',
        password: 'password updated',
        email:    'update@email.com'
      });
      const result = await userRepository.update(userData1);
      const [ first, second ] = await userRepository.getAll();
      expect(first).toEqual(user2);
      expect(second).toEqual(userData1);
    });
  });

  describe('Trainer', () => {
    test('Must create a new trainer and return its informations', async () => {
      const result = await userRepository.save(trainer1);
      await userRepository.save(trainer2);
      expect(result.id).toBe(trainer1.id);
      expect(result.name).toBe(trainer1.name);
      expect(result.surname).toBe(trainer1.surname);
      expect(result.fullname).toBe(trainer1.fullname);
      expect(result.username).toBe(trainer1.username);
      expect(result.password).toBe(trainer1.password);
      expect(result.role).toBe(trainer1.role);
      expect(result.email).toBe(trainer1.email);
      expect(result.status).toBe(trainer1.status);
      expect(result.created_at).toBe(trainer1.created_at);
      expect(result.updated_at).toBe(trainer1.updated_at);
      expect(result.deleted_at).toBe(trainer1.deleted_at);
      expect(result.register).toBe(trainer1.register);
      expect(result.plan).toBe(trainer1.plan);
      expect(result.athletes_limit).toBe(trainer1.athletes_limit);
      expect(result.athletes).toEqual(trainer1.athletes);
      expect(result.last_remove_date).toBe(trainer1.last_remove_date);
    });

    test('Must get trainer informations by user id', async () => {
      const userData = await userRepository.save(trainer1);
      await userRepository.save(user2);
      const result = await userRepository.get(userData.id) as Trainer;
      expect(result.id).toBe(trainer1.id);
      expect(result.name).toBe(trainer1.name);
      expect(result.surname).toBe(trainer1.surname);
      expect(result.fullname).toBe(trainer1.fullname);
      expect(result.username).toBe(trainer1.username);
      expect(result.password).toBe(trainer1.password);
      expect(result.role).toBe(trainer1.role);
      expect(result.email).toBe(trainer1.email);
      expect(result.status).toBe(trainer1.status);
      expect(result.created_at).toBe(trainer1.created_at);
      expect(result.updated_at).toBe(trainer1.updated_at);
      expect(result.deleted_at).toBe(trainer1.deleted_at);
      expect(result.register).toBe(trainer1.register);
      expect(result.plan).toBe(trainer1.plan);
      expect(result.athletes_limit).toBe(trainer1.athletes_limit);
      expect(result.athletes).toEqual(trainer1.athletes);
      expect(result.last_remove_date).toBe(trainer1.last_remove_date);
    });

    test('Must get all trainers', async () => {
      await userRepository.save(user1);
      await userRepository.save(user2);
      await userRepository.save(trainer1);
      await userRepository.save(trainer2);
      const [ first, second ] = await userRepository.getAll('trainer');
      expect(first).toEqual(trainer1);
      expect(second).toEqual(trainer2);
    });

    test('Must delete trainer by id', async () => {
      const trainerData = await userRepository.save(trainer1);
      const trainerData2 = await userRepository.save(trainer2);
      const result = await userRepository.delete(trainerData.id);
      const users = await userRepository.getAll('trainer');
      expect(result).toBeTruthy();
      expect(users).toHaveLength(1);
      expect(users[0]).toEqual(trainerData2);
      expect(users[1]).toBeUndefined();
    });

    test('Login with username', async () => {
      const trainerData1 = await userRepository.save(trainer1);
      await userRepository.save(trainer2);
      const input = { 
        login:    trainer1.username,
        password: `password${trainer1.id}`,
      };
      const result = await userRepository.login(input);
      expect(result).toEqual(trainer1);
    });

    test('Must update an existing trainer and return its new informations', async () => {
      const trainerData1 = await userRepository.save(trainer1);
      await userRepository.save(trainer2);
      trainerData1.update({ 
        name:          'name updated',
        surname:       'surname updated',
        register:      '11111-ce',
        status:        false,
        email:         'update@email.com',
        plan:          'free',
        athletes_limit: 5,
        username:       'username updated',
        password:       'password updated'
      });
      const result = await userRepository.update(trainerData1);
      const [ first, second ] = await userRepository.getAll();
      expect(first).toEqual(trainer2);
      expect(second).toEqual(trainerData1);
    });
  });
});

describe('Fail cases', () => {
  describe('User', () => {
    test('Must fail on get user that doesnt exists', async () => {
      expect(() => userRepository.get(99))
        .rejects
        .toThrow('User not found by id 99');
    });

    test('Must fail on save an user that username already exists', async () => {
      await userRepository.save(user1);
      expect(() => userRepository.save(user1))
        .rejects
        .toThrow('Username already in use');
    });

    test('Must fail on delete user that doesnt exists', async () => {
      expect(() => userRepository.delete(99))
        .rejects
        .toThrow('User not found by id 99');
    });

    test('Fail on login with wrong login', async () => {
      const userData1 = await userRepository.save(user1);
      await userRepository.save(user2);
      const input = { 
        login:    user1.username,
        password: `password${user1.id}`,
      };
      expect(() => userRepository.login(input))
        .rejects
        .toThrow('Login failed, verify provided credentials');
    });

    test('Fail on login with wrong password', async () => {
      const userData1 = await userRepository.save(user1);
      await userRepository.save(user2);
      const input = { 
        login:    user1.username,
        password: `fail`,
      };
      expect(() => userRepository.login(input))
        .rejects
        .toThrow('Login failed, verify provided credentials');
    });
  });
});

