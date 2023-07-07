import Trainer from '../../src/domain/entity/Trainer';

let trainer: Trainer;

beforeEach(() => {
  trainer = new Trainer(1, 'name', 'surname', 'username', 'password', '00000-ce', true, 'free', 5, new Date('2023-02-02T00:00:00'), new Date('2023-02-03T00:00:00'), new Date('2023-02-04T00:00:00'));
});

describe('Success cases', () => {
  test('Must create a new trainer with all fields', () => {
    expect(trainer.id).toBe(1);
    expect(trainer.name).toBe('name');
    expect(trainer.surname).toBe('surname');
    expect(trainer.fullname).toBe('name surname');
    expect(trainer.cref).toBe('00000-ce');
    expect(trainer.status).toBeTruthy();
    expect(trainer.plan).toBe('FREE');
    expect(trainer.students_limit).toBe(5);
    expect(trainer.role).toBe('TRAINER');
    expect(trainer.username).toBe('username');
    expect(trainer.password).toBe('password');
    expect(trainer.created_at).toEqual(new Date('2023-02-02T00:00:00'));
    expect(trainer.updated_at).toEqual(new Date('2023-02-03T00:00:00'));
    expect(trainer.deleted_at).toEqual(new Date('2023-02-04T00:00:00'));
  });

  test('Must create a new paid trainer', () => {
    trainer = new Trainer(1, 'name', 'surname', 'username', 'password', '00000-ce', true, 'paid', 50, new Date('2023-02-02T00:00:00'), new Date('2023-02-03T00:00:00'), new Date('2023-02-04T00:00:00'));
    expect(trainer.id).toBe(1);
    expect(trainer.name).toBe('name');
    expect(trainer.surname).toBe('surname');
    expect(trainer.fullname).toBe('name surname');
    expect(trainer.cref).toBe('00000-ce');
    expect(trainer.status).toBeTruthy();
    expect(trainer.plan).toBe('PAID');
    expect(trainer.students_limit).toBe(50);
    expect(trainer.role).toBe('TRAINER');
    expect(trainer.username).toBe('username');
    expect(trainer.password).toBe('password');
    expect(trainer.created_at).toEqual(new Date('2023-02-02T00:00:00'));
    expect(trainer.updated_at).toEqual(new Date('2023-02-03T00:00:00'));
    expect(trainer.deleted_at).toEqual(new Date('2023-02-04T00:00:00'));
  });

  test('Must update an existing trainer', () => {
    const updateResult = trainer.update({ 
      name:          'name updated',
      surname:       'surname updated',
      cref:          '11111-ce',
      status:        false,
      plan:          'free',
      students_limit: 5,
      username:       'username updated',
      password:       'password updated'
    });

    expect(updateResult).toBeTruthy();
    expect(trainer.id).toBe(1);
    expect(trainer.name).toBe('name updated');
    expect(trainer.surname).toBe('surname updated');
    expect(trainer.fullname).toBe('name updated surname updated');
    expect(trainer.cref).toBe('11111-ce');
    expect(trainer.status).toBeFalsy();
    expect(trainer.plan).toBe('FREE');
    expect(trainer.students_limit).toBe(5);
    expect(trainer.role).toBe('TRAINER');
    expect(trainer.username).toBe('username updated');
    expect(trainer.password).toBe('password updated');
    expect(trainer.created_at).toEqual(new Date('2023-02-02T00:00:00'));
    expect(trainer.updated_at).toBeInstanceOf(Date);
  });

  test('Must update an existing trainer with less fields', () => {
    const updateResult = trainer.update({ 
      name:    'name updated',
      surname: 'surname updated'
    });

    expect(updateResult).toBeTruthy();
    expect(trainer.id).toBe(1);
    expect(trainer.name).toBe('name updated');
    expect(trainer.surname).toBe('surname updated');
    expect(trainer.fullname).toBe('name updated surname updated');
    expect(trainer.cref).toBe('00000-ce');
    expect(trainer.status).toBeTruthy();
    expect(trainer.plan).toBe('FREE');
    expect(trainer.students_limit).toBe(5);
    expect(trainer.role).toBe('TRAINER');
    expect(trainer.username).toBe('username');
    expect(trainer.password).toBe('password');
    expect(trainer.created_at).toEqual(new Date('2023-02-02T00:00:00'));
    expect(trainer.updated_at).toBeInstanceOf(Date);
    expect(trainer.deleted_at).toEqual(new Date('2023-02-04T00:00:00'));
  });
});

describe('Fail cases', () => {
  test('Must fail on create a new trainer with name smaller than 3', () => {
    expect(() => new Trainer(1, '12', 'surname', 'username', 'password', '00000-ce', true, 'free', 5)).toThrow('Name must have length between 3 and 30');
  });

  test('Must fail on create a new trainer with name greater than 30', () => {
    expect(() => new Trainer(1, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'surname', 'username', 'password', '00000-ce', true, 'free', 5)).toThrow('Name must have length between 3 and 30');
  });

  test('Must fail on create a new trainer with surname smaller than 3', () => {
    expect(() => new Trainer(1, 'name', '12', 'username', 'password', '00000-ce', true, 'free', 5)).toThrow('Surname must have length between 3 and 30');
  });

  test('Must fail on create a new trainer with surname greater than 30', () => {
    expect(() => new Trainer(1, 'name', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'username', 'password', '00000-ce', true, 'free', 5)).toThrow('Surname must have length between 3 and 30');
  });

  test('Must fail on create a new trainer with plan free and students limit greater than 5', () => {
    expect(() => new Trainer(1, 'name', 'surname', 'username', 'password', '00000-ce', true, 'free', 6)).toThrow('Free plan can only has 5 students');
  });

  test('Must fail on update a trainer with invalid plan', () => {
    expect(() => trainer.update({ plan: 'doesnt exists' })).toThrow('Plan must be Free or Paid');
  });

  test('Must fail on update a trainer with invalid students limit as free plan', () => {
    expect(() => trainer.update({ students_limit: 10 })).toThrow('Free plan can only has 5 students');
  });

  test('Must fail on update a trainer with name smaller than 3', () => {
    expect(() => trainer.update({ name: '12' })).toThrow('Name must have length between 3 and 30');
  });

  test('Must fail on update a trainer with name greater than 30', () => {
    expect(() => trainer.update({ name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' })).toThrow('Name must have length between 3 and 30');
  });

  test('Must fail on update a trainer with surname smaller than 3', () => {
    expect(() => trainer.update({ surname: '12' })).toThrow('Surname must have length between 3 and 30');
  });

  test('Must fail on update a trainer with surname greater than 30', () => {
    expect(() => trainer.update({ surname: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' })).toThrow('Surname must have length between 3 and 30');
  });
});

