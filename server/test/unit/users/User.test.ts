import DateRegisters from "../../../src/domain/entity/common/DateRegisters";
import User from "../../../src/domain/entity/users/User";
import { generateDateRegisters } from "../../seeds/common";

let user: User;
let dateRegisters: DateRegisters;

beforeEach(() => {
  dateRegisters = generateDateRegisters(1);
  user = new User(
    1, 
    'name', 
    'surname', 
    'username', 
    'password', 
    'admin', 
    'EMAIL@email.com',
    true, 
    dateRegisters
  );
});

describe('Success cases', () => {
  test('Must create a new user', () => {
    expect(user.id).toBe(1);
    expect(user.name).toBe('name');
    expect(user.surname).toBe('surname');
    expect(user.fullname).toBe('name surname');
    expect(user.username).toBe('username');
    expect(user.password).toBe('password');
    expect(user.role).toBe('ADMIN');
    expect(user.email).toBe('email@email.com');
    expect(user.status).toBeTruthy();
    expect(user.created_at).toEqual(dateRegisters.created_at);
    expect(user.updated_at).toEqual(dateRegisters.updated_at);
    expect(user.deleted_at).toEqual(dateRegisters.deleted_at);
  });

  test('Must create a new user without optional fields', () => {
    user = new User(1, 'name', 'surname', 'username', 'password', 'ADMIN', 'email@email.com', true, dateRegisters);
    expect(user.id).toBe(1);
    expect(user.name).toBe('name');
    expect(user.surname).toBe('surname');
    expect(user.fullname).toBe('name surname');
    expect(user.username).toBe('username');
    expect(user.password).toBe('password');
    expect(user.role).toBe('ADMIN');
    expect(user.email).toBe('email@email.com');
    expect(user.status).toBeTruthy();
    expect(user.created_at).toBeInstanceOf(Date);
    expect(user.updated_at).toBeInstanceOf(Date);
    expect(user.deleted_at).toBeUndefined();
  });

  test('Must update an existing user', () => {
    const updateResult = user.update({
      name:     'name updated',
      surname:  'surname updated',
      status:   false,
      username: 'username updated',
      password: 'password updated',
      role:     'admin',
      email:    'update@email.com'
    });

    expect(updateResult).toBeTruthy();
    expect(user.id).toBe(1);
    expect(user.name).toBe('name updated');
    expect(user.surname).toBe('surname updated');
    expect(user.fullname).toBe('name updated surname updated');
    expect(user.status).toBeFalsy();
    expect(user.role).toBe('ADMIN');
    expect(user.email).toBe('update@email.com');
    expect(user.username).toBe('username updated');
    expect(user.password).toBe('password updated');
    expect(user.created_at).toEqual(dateRegisters.created_at);
    expect(user.updated_at).toBeInstanceOf(Date);
  });

  test('Must update an existing user with less fields', () => {
    const updateResult = user.update({
      name:     'name updated',
      surname:  'surname updated'
    });

    expect(updateResult).toBeTruthy();
    expect(user.name).toBe('name updated');
    expect(user.surname).toBe('surname updated');
    expect(user.fullname).toBe('name updated surname updated');
    expect(user.username).toBe('username');
    expect(user.password).toBe('password');
    expect(user.role).toBe('ADMIN');
    expect(user.email).toBe('email@email.com');
    expect(user.status).toBeTruthy();
    expect(user.created_at).toEqual(dateRegisters.created_at);
    expect(user.updated_at).toBeInstanceOf(Date);
    expect(user.deleted_at).toEqual(dateRegisters.deleted_at);
  });

  test.todo('Validate paranoid delete');
});

describe('Fail cases', () => {
  test('Must fail on create an user with invalid role', () => {
    expect(() => new User(1, 'name', 'surname', 'username', 'password', 'asdfasdf', 'email@email.com', true, dateRegisters))
      .toThrow('User role must be Admin, Trainer or Athlete.');
  });

  test('Must fail on create a new user with name smaller than 3', () => {
    expect(() => new User(1, '12', 'surname', 'username', 'password', 'admin', 'email@email.com', true, dateRegisters))
      .toThrow('Name must have length between 3 and 30');
  });

  test('Must fail on create a new user with name greater than 30', () => {
    expect(() => new User(1, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'surname', 'username', 'password', 'admin', 'email@email.com', true, dateRegisters))
      .toThrow('Name must have length between 3 and 30');
  });

  test('Must fail on create a new user with surname smaller than 3', () => {
    expect(() => new User(1, 'name', '12', 'username', 'password', 'admin', 'email@email.com', true, dateRegisters))
      .toThrow('Surname must have length between 3 and 30');
  });

  test('Must fail on create a new user with surname greater than 30', () => {
    expect(() => new User(1, 'name', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'username', 'password', 'admin', 'email@email.com', true, dateRegisters))
      .toThrow('Surname must have length between 3 and 30');
  });

  test('Must fail on create a new user with surname greater than 30', () => {
    expect(() => new User(1, 'name', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'username', 'password', 'admin', 'email@email.com', true, dateRegisters))
      .toThrow('Surname must have length between 3 and 30');
  });

  test('Must fail on create a new user with username greater than 20', () => {
    expect(() => new User(1, 'name', 'surname', '12', 'password', 'admin', 'email@email.com', true, dateRegisters))
      .toThrow('Username must have length between 3 and 20');
  });

  test('Must fail on create user with invalid email', () => {
    expect(() => new User(1, 'name', 'surname', 'username', 'password', 'admin', 'email@.com', true, dateRegisters))
      .toThrow('Invalid email format');
  });

  test('Must fail on update user with invalid email', () => {
    expect(() => user.update({ email: 'invalid' }))
      .toThrow('Invalid email format');
  });
});
