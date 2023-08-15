import Trainer from '../../src/domain/entity/Trainer';
import Athlete from '../../src/domain/entity/Athlete';
import RequestAthlete from '../../src/domain/entity/RequestAthlete';
import { generateTrainer, generateAthlete } from '../seeds/user';

let trainer: Trainer;
let athlete: Athlete;
let requestAthlete: RequestAthlete;

beforeAll(() => {
  trainer = generateTrainer(1);
  athlete = generateAthlete(2);
  requestAthlete = new RequestAthlete(1, trainer, athlete);
});

describe('Successful cases', () => {
  test('Trainer request to associate to athlete', () =>{
    expect(requestAthlete.trainer).toEqual(trainer);
    expect(requestAthlete.athlete).toEqual(athlete);
    expect(requestAthlete.wasAccepted).toBeUndefined();
  });

  test('Athlete accept trainer\'s request as default value', () =>{
    requestAthlete.handle(athlete.id);
    expect(requestAthlete.wasAccepted).toBeTruthy();
  });

  test('Athlete accept trainer\'s request', () =>{
    requestAthlete.handle(athlete.id, true);
    expect(requestAthlete.wasAccepted).toBeTruthy();
  });

  test('Athlete refuse trainer\'s request', () =>{
    requestAthlete.handle(athlete.id, false);
    expect(requestAthlete.wasAccepted).toBeFalsy();
  });
});

describe('Failure cases', () => {
  test('Athlete accept trainer\'s request', () =>{
    expect(() => requestAthlete.handle(5, true))
      .toThrow('Athlete doesnt\'t have this trainer request');
  });
});

