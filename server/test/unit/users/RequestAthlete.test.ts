import Athlete from "../../../src/domain/entity/users/Athlete";
import RequestAthlete from "../../../src/domain/entity/users/RequestAthlete";
import Trainer from "../../../src/domain/entity/users/Trainer";
import { generateTrainer, generateAthlete } from "../../seeds/user";

let trainer: Trainer;
let athlete: Athlete;
let requestAthlete: RequestAthlete;

beforeEach(() => {
  trainer = generateTrainer(1);
  athlete = generateAthlete(2);
  requestAthlete = new RequestAthlete(1, trainer, athlete);
});

describe('Successful cases', () => {
  test('Denied trainer request to associate to athlete', () =>{
    const requestAthlete2 = new RequestAthlete(2, trainer, athlete, false);
    expect(requestAthlete2.trainer).toEqual(trainer);
    expect(requestAthlete2.athlete).toEqual(athlete);
    expect(requestAthlete2.was_accepted).toBeFalsy();
  });

  test('Accepted trainer request to associate to athlete', () =>{
    const requestAthlete2 = new RequestAthlete(2, trainer, athlete, true);
    expect(requestAthlete2.trainer).toEqual(trainer);
    expect(requestAthlete2.athlete).toEqual(athlete);
    expect(requestAthlete2.was_accepted).toBeTruthy();
  });

  test('Trainer request to associate to athlete', () =>{
    expect(requestAthlete.trainer).toEqual(trainer);
    expect(requestAthlete.athlete).toEqual(athlete);
    expect(requestAthlete.was_accepted).toBeUndefined();
  });

  test('Athlete accept trainer\'s request as default value', () =>{
    requestAthlete.handle(athlete.id);
    expect(requestAthlete.was_accepted).toBeTruthy();
  });

  test('Athlete accept trainer\'s request', () =>{
    requestAthlete.handle(athlete.id, true);
    expect(requestAthlete.was_accepted).toBeTruthy();
    expect(athlete.trainer).toEqual(trainer);
  });

  test('Athlete refuse trainer\'s request', () =>{
    requestAthlete.handle(athlete.id, false);
    expect(requestAthlete.was_accepted).toBeFalsy();
    expect(athlete.trainer).toBeUndefined();
  });
});

describe('Failure cases', () => {
  test('Athlete accept trainer\'s request', () =>{
    expect(() => requestAthlete.handle(5, true))
      .toThrow('Athlete doesnt\'t have this trainer request');
  });
});

