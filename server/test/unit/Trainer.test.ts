import Trainer from '../../src/domain/entity/Trainer';
import Athlete from '../../src/domain/entity/Athlete';

let trainer: Trainer;
let athlete: Athlete;

beforeEach(() => {
  athlete = new Athlete(1, 'name', 'surname', 'username', 'password', 'email@email.com', true);
  trainer = new Trainer(1, 'name', 'surname', 'username', 'password', '00000-ce', 'email@email.com', true, 'free', 5, [ athlete ], new Date('2023-02-02T00:00:00'), new Date('2023-02-03T00:00:00'), new Date('2023-02-04T00:00:00'));
});

describe('Success cases', () => {
  test('Must create a new trainer with all fields', () => {
    expect(trainer.id).toBe(1);
    expect(trainer.name).toBe('name');
    expect(trainer.surname).toBe('surname');
    expect(trainer.fullname).toBe('name surname');
    expect(trainer.register).toBe('00000-ce');
    expect(trainer.status).toBeTruthy();
    expect(trainer.plan).toBe('FREE');
    expect(trainer.athletes_limit).toBe(5);
    expect(trainer.role).toBe('TRAINER');
    expect(trainer.email).toBe('email@email.com');
    expect(trainer.username).toBe('username');
    expect(trainer.password).toBe('password');
    expect(trainer.athletes).toEqual([ athlete ]);
    expect(trainer.created_at).toEqual(new Date('2023-02-02T00:00:00'));
    expect(trainer.updated_at).toEqual(new Date('2023-02-03T00:00:00'));
    expect(trainer.deleted_at).toEqual(new Date('2023-02-04T00:00:00'));
  });

  test('Must create a new paid trainer', () => {
    trainer = new Trainer(1, 'name', 'surname', 'username', 'password', '00000-ce', 'email@email.com', true, 'paid', 50, undefined, new Date('2023-02-02T00:00:00'), new Date('2023-02-03T00:00:00'), new Date('2023-02-04T00:00:00'));
    expect(trainer.id).toBe(1);
    expect(trainer.name).toBe('name');
    expect(trainer.surname).toBe('surname');
    expect(trainer.fullname).toBe('name surname');
    expect(trainer.register).toBe('00000-ce');
    expect(trainer.status).toBeTruthy();
    expect(trainer.plan).toBe('PAID');
    expect(trainer.athletes_limit).toBe(50);
    expect(trainer.role).toBe('TRAINER');
    expect(trainer.email).toBe('email@email.com');
    expect(trainer.username).toBe('username');
    expect(trainer.password).toBe('password');
    expect(trainer.athletes).toHaveLength(0);
    expect(trainer.created_at).toEqual(new Date('2023-02-02T00:00:00'));
    expect(trainer.updated_at).toEqual(new Date('2023-02-03T00:00:00'));
    expect(trainer.deleted_at).toEqual(new Date('2023-02-04T00:00:00'));
  });

  test('Must update an existing trainer', () => {
    const updateResult = trainer.update({ 
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

    expect(updateResult).toBeTruthy();
    expect(trainer.id).toBe(1);
    expect(trainer.name).toBe('name updated');
    expect(trainer.surname).toBe('surname updated');
    expect(trainer.fullname).toBe('name updated surname updated');
    expect(trainer.register).toBe('11111-ce');
    expect(trainer.status).toBeFalsy();
    expect(trainer.plan).toBe('FREE');
    expect(trainer.athletes_limit).toBe(5);
    expect(trainer.role).toBe('TRAINER');
    expect(trainer.email).toBe('update@email.com');
    expect(trainer.username).toBe('username updated');
    expect(trainer.password).toBe('password updated');
    expect(trainer.athletes).toEqual([ athlete ]);
    expect(trainer.created_at).toEqual(new Date('2023-02-02T00:00:00'));
    expect(trainer.updated_at).toBeInstanceOf(Date);
    expect(trainer.deleted_at).toEqual(new Date('2023-02-04T00:00:00'));
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
    expect(trainer.register).toBe('00000-ce');
    expect(trainer.status).toBeTruthy();
    expect(trainer.plan).toBe('FREE');
    expect(trainer.athletes_limit).toBe(5);
    expect(trainer.role).toBe('TRAINER');
    expect(trainer.email).toBe('email@email.com');
    expect(trainer.username).toBe('username');
    expect(trainer.password).toBe('password');
    expect(trainer.athletes).toEqual([ athlete ]);
    expect(trainer.created_at).toEqual(new Date('2023-02-02T00:00:00'));
    expect(trainer.updated_at).toBeInstanceOf(Date);
    expect(trainer.deleted_at).toEqual(new Date('2023-02-04T00:00:00'));
  });

  test('Must add a new athlete', () => {
    const newAthlete = new Athlete(2, 'name 2', 'surname 2', 'username 2', 'password 2', 'email@email.com', true);
    trainer.addAthlete(newAthlete);
    expect(trainer.athletes).toEqual([ athlete, newAthlete ]);
  });

  test('Must remove an athlete', () => {
    const newAthlete = new Athlete(2, 'name 2', 'surname 2', 'username 2', 'password 2', 'email@email.com', true);
    trainer.addAthlete(newAthlete);
    trainer.removeAthlete(athlete);
    expect(trainer.athletes).toEqual([ newAthlete ]);
  });

  test('Must remove two athletes at the same day as paid plan', () => {
    const newAthlete = new Athlete(2, 'name 2', 'surname 2', 'username 2', 'password 2', 'email@email.com', true);
    trainer.plan = 'paid';
    trainer.addAthlete(newAthlete);
    trainer.removeAthlete(athlete);
    trainer.removeAthlete(newAthlete);
    expect(trainer.athletes).toEqual([]);
  });
});

describe('Fail cases', () => {
  test('Must fail on create a new trainer with plan free and athletes limit greater than 5', () => {
    expect(() => new Trainer(1, 'name', 'surname', 'username', 'password', '00000-ce', 'email@email.com', true, 'free', 6)).toThrow('Free plan can only has 5 athletes');
  });

  test('Must fail on update a trainer with invalid plan', () => {
    expect(() => trainer.update({ plan: 'doesnt exists' })).toThrow('Plan must be Free or Paid');
  });

  test('Must fail on update a trainer with invalid athletes limit as free plan', () => {
    expect(() => trainer.update({ athletes_limit: 10 })).toThrow('Free plan can only has 5 athletes');
  });

  test('Must fail on try to exclude two athletes in less than 24 hours as free plan', () => {
    const athlete2 = new Athlete(2, 'name 2', 'surname 2', 'username 2', 'password 2', 'email@email.com', true);
    trainer.addAthlete(athlete2);
    trainer.removeAthlete(athlete);
    expect(() => trainer.removeAthlete(athlete2)).toThrow('You only can remove one athlete by day');
  });
});

