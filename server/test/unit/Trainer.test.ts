import Trainer from '../../src/domain/entity/Trainer';

let trainer: Trainer;

beforeEach(() => {
  trainer = new Trainer(1, 'Name', 'Surname', '00000-ce', true, 'free', 5);
});

describe('Success cases', () => {
  test('Must create a new trainer with all fields', () => {
    expect(trainer.id).toBe(1);
    expect(trainer.name).toBe('Name');
    expect(trainer.surname).toBe('Surname');
    expect(trainer.fullname).toBe('Name Surname');
    expect(trainer.cref).toBe('00000-ce');
    expect(trainer.status).toBeTruthy();
    expect(trainer.plan).toBe('FREE');
    expect(trainer.students_limit).toBe(5);
  });

  test('Must create a new paid trainer', () => {
    trainer = new Trainer(1, 'Name', 'Surname', '00000-ce', true, 'paid', 50);
    expect(trainer.id).toBe(1);
    expect(trainer.name).toBe('Name');
    expect(trainer.surname).toBe('Surname');
    expect(trainer.fullname).toBe('Name Surname');
    expect(trainer.cref).toBe('00000-ce');
    expect(trainer.status).toBeTruthy();
    expect(trainer.plan).toBe('PAID');
    expect(trainer.students_limit).toBe(50);
  });

  test('Must update an existing trainer', () => {
    const updateResult = trainer.update({ 
      name:          'Name updated',
      surname:       'Surname updated',
      cref:          '11111-ce',
      status:        false,
      plan:          'free',
      students_limit: 5
    });

    expect(updateResult).toBeTruthy();
    expect(trainer.id).toBe(1);
    expect(trainer.name).toBe('Name updated');
    expect(trainer.surname).toBe('Surname updated');
    expect(trainer.fullname).toBe('Name updated Surname updated');
    expect(trainer.cref).toBe('11111-ce');
    expect(trainer.status).toBeFalsy();
    expect(trainer.plan).toBe('FREE');
    expect(trainer.students_limit).toBe(5);
  });

  test('Must update an existing trainer with less fields', () => {
    const updateResult = trainer.update({ 
      name:    'Name updated',
      surname: 'Surname updated'
    });

    expect(updateResult).toBeTruthy();
    expect(trainer.id).toBe(1);
    expect(trainer.name).toBe('Name updated');
    expect(trainer.surname).toBe('Surname updated');
    expect(trainer.fullname).toBe('Name updated Surname updated');
    expect(trainer.cref).toBe('00000-ce');
    expect(trainer.status).toBeTruthy();
    expect(trainer.plan).toBe('FREE');
    expect(trainer.students_limit).toBe(5);
  });
});

describe('Fail cases', () => {
  test('Must fail on create a new trainer with name smaller than 3', () => {
    expect(() => new Trainer(1, '12', 'Surname', '00000-ce', true)).toThrow('Name must have length between 3 and 30');
  });

  test('Must fail on create a new trainer with name greater than 30', () => {
    expect(() => new Trainer(1, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'Surname', '00000-ce', true)).toThrow('Name must have length between 3 and 30');
  });

  test('Must fail on update a trainer with name smaller than 3', () => {
    expect(() => trainer.update({ name: '12' })).toThrow('Name must have length between 3 and 30');
  });

  test('Must fail on update a trainer with name greater than 30', () => {
    expect(() => trainer.update({ name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' })).toThrow('Name must have length between 3 and 30');
  });

  test('Must fail on create a new trainer with surname smaller than 3', () => {
    expect(() => new Trainer(1, 'Name', '12', '00000-ce', true)).toThrow('Surname must have length between 3 and 30');
  });

  test('Must fail on create a new trainer with surname greater than 30', () => {
    expect(() => new Trainer(1, 'Name', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '00000-ce', true)).toThrow('Surname must have length between 3 and 30');
  });

  test('Must fail on create a new trainer with plan free and students limit greater than 5', () => {
    expect(() => new Trainer(1, 'Name', 'Surname', '00000-ce', true, 'free', 6)).toThrow('Free plan can only has 5 students');
  });

  test('Must fail on update a trainer with surname smaller than 3', () => {
    expect(() => trainer.update({ surname: '12' })).toThrow('Surname must have length between 3 and 30');
  });

  test('Must fail on update a trainer with surname greater than 30', () => {
    expect(() => trainer.update({ surname: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' })).toThrow('Surname must have length between 3 and 30');
  });

  test('Must fail on update a trainer with invalid plan', () => {
    expect(() => trainer.update({ plan: 'doesnt exists' })).toThrow('Plan must be Free or Paid');
  });

  test('Must fail on update a trainer with invalid students limit as free plan', () => {
    expect(() => trainer.update({ students_limit: 10 })).toThrow('Free plan can only has 5 students');
  });
});

