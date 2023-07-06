import Trainer from '../../src/domain/entity/Trainer';

describe('Success tests', () => {
  test('Must create a new trainer with all fields', () => {
    const trainer = new Trainer(1, 'Name', 'Surname', '00000-ce', true);

    expect(trainer.id).toBe(1);
    expect(trainer.name).toBe('Name');
    expect(trainer.surname).toBe('Surname');
    expect(trainer.fullname).toBe('Name Surname');
    expect(trainer.cref).toBe('00000-ce');
    expect(trainer.status).toBeTruthy();
  });

  test('Must update and existing trainer with it setters', () => {
    const trainer = new Trainer(1, 'Name', 'Surname', '00000-ce', true);

    trainer.name    = 'Name updated';
    trainer.surname = 'Surname updated';
    trainer.cref    = '11111-ce';
    trainer.status  = false;

    expect(trainer.id).toBe(1);
    expect(trainer.name).toBe('Name updated');
    expect(trainer.surname).toBe('Surname updated');
    expect(trainer.fullname).toBe('Name updated Surname updated');
    expect(trainer.cref).toBe('11111-ce');
    expect(trainer.status).toBeFalsy();
  });

  test('Must update and existing trainer', () => {
    const trainer = new Trainer(1, 'Name', 'Surname', '00000-ce', true);
    const updateResult = trainer.update({ 
      name: 'Name updated',
      surname: 'Surname updated',
      cref: '11111-ce',
      status: false
    });

    expect(updateResult).toBeTruthy();
    expect(trainer.id).toBe(1);
    expect(trainer.name).toBe('Name updated');
    expect(trainer.surname).toBe('Surname updated');
    expect(trainer.fullname).toBe('Name updated Surname updated');
    expect(trainer.cref).toBe('11111-ce');
    expect(trainer.status).toBeFalsy();
  });

  test('Must update and existing trainer with less fields', () => {
    const trainer = new Trainer(1, 'Name', 'Surname', '00000-ce', true);
    const updateResult = trainer.update({ 
      name: 'Name updated',
      surname: 'Surname updated'
    });

    expect(updateResult).toBeTruthy();
    expect(trainer.id).toBe(1);
    expect(trainer.name).toBe('Name updated');
    expect(trainer.surname).toBe('Surname updated');
    expect(trainer.fullname).toBe('Name updated Surname updated');
    expect(trainer.cref).toBe('00000-ce');
    expect(trainer.status).toBeTruthy();
  });
});

describe('Fail tests', () => {
  test('Must fail on create a new trainer with name smaller than 3', () => {
    expect(() => new Trainer(1, '12', 'Surname', '00000-ce', true)).toThrow('Name must have length between 3 and 30');
  });

  test('Must fail on create a new trainer with name greater than 30', () => {
    expect(() => new Trainer(1, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'Surname', '00000-ce', true)).toThrow('Name must have length between 3 and 30');
  });

  test('Must fail on create a new trainer with surname smaller than 3', () => {
    expect(() => new Trainer(1, 'Name', '12', '00000-ce', true)).toThrow('Surname must have length between 3 and 30');
  });

  test('Must fail on create a new trainer with surname greater than 30', () => {
    expect(() => new Trainer(1, 'Name', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '00000-ce', true)).toThrow('Surname must have length between 3 and 30');
  });
});

