import User from '../../src/domain/entity/User';

let user: User;

beforeEach(() => {
  user = new User(1, 'name', 'surname', 'username', 'password', 'admin', true, new Date('2023-02-02T00:00:00'), new Date('2023-02-03T00:00:00'), new Date('2023-02-04T00:00:00'));
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
    expect(user.status).toBeTruthy();
    expect(user.created_at).toEqual(new Date('2023-02-02T00:00:00'));
    expect(user.updated_at).toEqual(new Date('2023-02-03T00:00:00'));
    expect(user.deleted_at).toEqual(new Date('2023-02-04T00:00:00'));
  });

  test('Must create a new user without optional fields', () => {
    user = new User(1, 'name', 'surname', 'username', 'password', 'ADMIN', true);
    expect(user.id).toBe(1);
    expect(user.name).toBe('name');
    expect(user.surname).toBe('surname');
    expect(user.fullname).toBe('name surname');
    expect(user.username).toBe('username');
    expect(user.password).toBe('password');
    expect(user.role).toBe('ADMIN');
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
      role:     'admin'
    });

    expect(updateResult).toBeTruthy();
    expect(user.id).toBe(1);
    expect(user.name).toBe('name updated');
    expect(user.surname).toBe('surname updated');
    expect(user.fullname).toBe('name updated surname updated');
    expect(user.status).toBeFalsy();
    expect(user.role).toBe('ADMIN');
    expect(user.username).toBe('username updated');
    expect(user.password).toBe('password updated');
    expect(user.created_at).toEqual(new Date('2023-02-02T00:00:00'));
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
    expect(user.status).toBeTruthy();
    expect(user.created_at).toEqual(new Date('2023-02-02T00:00:00'));
    expect(user.updated_at).toBeInstanceOf(Date);
    expect(user.deleted_at).toEqual(new Date('2023-02-04T00:00:00'));
  });

  test('Must update an existing user', () => {
  });
});

describe('Fail cases', () => {
  test('Must fail on create an user with invalid role', () => {
    expect(() => new User(1, 'name', 'surname', 'username', 'password', 'asdfasdf', true)).toThrow('User role must be Admin, Trainer or Athlete.');
  });

  test('Must fail on create a new user with name smaller than 3', () => {
    expect(() => new User(1, '12', 'surname', 'username', 'password', 'admin', true)).toThrow('Name must have length between 3 and 30');
  });

  test('Must fail on create a new user with name greater than 30', () => {
    expect(() => new User(1, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'surname', 'username', 'password', 'admin', true)).toThrow('Name must have length between 3 and 30');
  });

  test('Must fail on create a new user with surname smaller than 3', () => {
    expect(() => new User(1, 'name', '12', 'username', 'password', 'admin', true)).toThrow('Surname must have length between 3 and 30');
  });

  test('Must fail on create a new user with surname greater than 30', () => {
    expect(() => new User(1, 'name', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'username', 'password', 'admin', true)).toThrow('Surname must have length between 3 and 30');
  });

  test('Must fail on create a new user with surname greater than 30', () => {
    expect(() => new User(1, 'name', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'username', 'password', 'admin', true)).toThrow('Surname must have length between 3 and 30');
  });

  test('Must fail on create a new user with username greater than 20', () => {
    expect(() => new User(1, 'name', 'surname', '12', 'password', 'admin', true)).toThrow('Username must have length between 3 and 20');
  });
});

