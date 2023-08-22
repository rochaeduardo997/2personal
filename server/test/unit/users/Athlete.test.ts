import Athlete from "../../../src/domain/entity/users/Athlete";
import Trainer from "../../../src/domain/entity/users/Trainer";

let trainer: Trainer;
let athlete: Athlete;

beforeEach(() => {
  trainer = new Trainer(1, 'name', 'surname', 'username', 'password', '00000-ce', 'email@email.com', true);
  athlete = new Athlete(1, 'name', 'surname', 'username', 'password', 'email@email.com', true, trainer, new Date('2023-02-02T00:00:00'), new Date('2023-02-03T00:00:00'), new Date('2023-02-04T00:00:00'));
});

describe('Success cases', () => {
  test('Must create a new athlete with all fields', () => {
    expect(athlete.id).toBe(1);
    expect(athlete.name).toBe('name');
    expect(athlete.surname).toBe('surname');
    expect(athlete.fullname).toBe('name surname');
    expect(athlete.status).toBeTruthy();
    expect(athlete.role).toBe('ATHLETE');
    expect(athlete.email).toBe('email@email.com');
    expect(athlete.trainer).toBe(trainer);
    expect(athlete.username).toBe('username');
    expect(athlete.password).toBe('password');
    expect(athlete.created_at).toEqual(new Date('2023-02-02T00:00:00'));
    expect(athlete.updated_at).toEqual(new Date('2023-02-03T00:00:00'));
    expect(athlete.deleted_at).toEqual(new Date('2023-02-04T00:00:00'));
  });

  test('Must create a new athlete without trainer', () => {
    athlete = new Athlete(1, 'name', 'surname', 'username', 'password', 'email@email.com', true, undefined, new Date('2023-02-02T00:00:00'), new Date('2023-02-03T00:00:00'), new Date('2023-02-04T00:00:00'));
    expect(athlete.id).toBe(1);
    expect(athlete.name).toBe('name');
    expect(athlete.surname).toBe('surname');
    expect(athlete.fullname).toBe('name surname');
    expect(athlete.status).toBeTruthy();
    expect(athlete.role).toBe('ATHLETE');
    expect(athlete.email).toBe('email@email.com');
    expect(athlete.trainer).toBeUndefined();
    expect(athlete.username).toBe('username');
    expect(athlete.password).toBe('password');
    expect(athlete.created_at).toEqual(new Date('2023-02-02T00:00:00'));
    expect(athlete.updated_at).toEqual(new Date('2023-02-03T00:00:00'));
    expect(athlete.deleted_at).toEqual(new Date('2023-02-04T00:00:00'));
  });

  test('Must update an existing athlete', () => {
    const updateResult = athlete.update({
      name:     'name updated',
      surname:  'surname updated',
      email:    'update@email.com',
      status:   false,
      username: 'username updated',
      password: 'password updated'
    });

    expect(updateResult).toBeTruthy();
    expect(athlete.id).toBe(1);
    expect(athlete.name).toBe('name updated');
    expect(athlete.surname).toBe('surname updated');
    expect(athlete.fullname).toBe('name updated surname updated');
    expect(athlete.status).toBeFalsy();
    expect(athlete.role).toBe('ATHLETE');
    expect(athlete.email).toBe('update@email.com');
    expect(athlete.trainer).toBe(trainer);
    expect(athlete.username).toBe('username updated');
    expect(athlete.password).toBe('password updated');
    expect(athlete.created_at).toEqual(new Date('2023-02-02T00:00:00'));
    expect(athlete.updated_at).toBeInstanceOf(Date);
    expect(athlete.deleted_at).toEqual(new Date('2023-02-04T00:00:00'));
  });

  test('Must update an existing athlete with less fields', () => {
    const updateResult = athlete.update({ 
      name:    'name updated',
      surname: 'surname updated'
    });

    expect(updateResult).toBeTruthy();
    expect(athlete.id).toBe(1);
    expect(athlete.name).toBe('name updated');
    expect(athlete.surname).toBe('surname updated');
    expect(athlete.fullname).toBe('name updated surname updated');
    expect(athlete.status).toBeTruthy();
    expect(athlete.role).toBe('ATHLETE');
    expect(athlete.email).toBe('email@email.com');
    expect(athlete.trainer).toBe(trainer);
    expect(athlete.username).toBe('username');
    expect(athlete.password).toBe('password');
    expect(athlete.created_at).toEqual(new Date('2023-02-02T00:00:00'));
    expect(athlete.updated_at).toBeInstanceOf(Date);
    expect(athlete.deleted_at).toEqual(new Date('2023-02-04T00:00:00'));
  });

  test('Must change trainer', () => {
    const newTrainer = new Trainer(2, 'name 2', 'surname 2', 'username 2', 'password 2', '11111-ce', 'email@email.com', true);
    newTrainer.addAthlete(athlete);
    expect(athlete.trainer).toBe(newTrainer);
  });

  test('Must stay without trainer after been removed', () => {
    trainer.removeAthlete(athlete);
    expect(athlete.trainer).toBeUndefined();
  });
});

