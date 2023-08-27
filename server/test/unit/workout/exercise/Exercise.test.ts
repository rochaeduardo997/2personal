import Trainer from "../../../../src/domain/entity/users/Trainer";
import Exercise from "../../../../src/domain/entity/workout/exercise/Exercise";
import Rest from "../../../../src/domain/entity/workout/exercise/Rest";
import Reps from "../../../../src/domain/entity/workout/exercise/Reps";
import DateRegisters from "../../../../src/domain/entity/common/DateRegisters";
import { generateTrainer } from "../../../seeds/user";
import { generateDateRegisters } from "../../../seeds/common";
import { generateReps, generateRest } from "../../../seeds/workout/exercise";

let trainer: Trainer;
let reps: Reps;
let rest: Rest;
let dateRegisters: DateRegisters;

beforeAll(() => {
  trainer = generateTrainer(1);
  reps = generateReps();
  rest = generateRest();
  dateRegisters = generateDateRegisters(1);
});

describe('Successful cases', () => {
  test('Compound exercise instance', () => {
    const compound = new Exercise(1, trainer, 'chest', 'exercise name', reps, rest, dateRegisters, 'note');
    const exercise = new Exercise(2, trainer, 'chest', 'exercise name', reps, rest, dateRegisters, 'note', compound);
    expect(exercise.compound).toEqual(compound);
  });

  test('Normal exercise instance', () => {
    const exercise = new Exercise(1, trainer, 'chest', 'exercise name', reps, rest, dateRegisters, 'note');
    expect(exercise.id).toBe(1);
    expect(exercise.trainer).toEqual(trainer);
    expect(exercise.category).toBe('chest');
    expect(exercise.name).toBe('exercise name');
    expect(exercise.reps).toEqual(reps);
    expect(exercise.rest).toEqual(rest);
    expect(exercise.note).toBe('note');
    expect(exercise.created_at).toEqual(dateRegisters.created_at);
    expect(exercise.updated_at).toEqual(dateRegisters.updated_at);
    expect(exercise.deleted_at).toEqual(dateRegisters.deleted_at);
  });

  test('Exercise without optional fields', () => {
    const exercise = new Exercise(1, trainer, 'chest', 'exercise name', reps, rest, dateRegisters);
    expect(exercise.id).toBe(1);
    expect(exercise.trainer).toEqual(trainer);
    expect(exercise.category).toBe('chest');
    expect(exercise.name).toBe('exercise name');
    expect(exercise.reps).toEqual(reps);
    expect(exercise.rest).toEqual(rest);
    expect(exercise.note).toBeUndefined();
    expect(exercise.created_at).toEqual(dateRegisters.created_at);
    expect(exercise.updated_at).toEqual(dateRegisters.updated_at);
    expect(exercise.deleted_at).toEqual(dateRegisters.deleted_at);
  });

  test('Update exercise', () => {
    const exercise = new Exercise(1, trainer, 'chest', 'exercise name', reps, rest, dateRegisters, 'note');
    const newReps  = new Reps(1, [ 1 ], 'dropset');
    const newRest  = new Rest(2, 1);

    exercise.update({
      category: 'leg',
      name:     'name update',
      reps:     newReps,
      rest:     newRest,
      note:     'note update'
    });

    expect(exercise.id).toBe(1);
    expect(exercise.trainer).toEqual(trainer);
    expect(exercise.category).toBe('leg');
    expect(exercise.name).toBe('name update');
    expect(exercise.reps).toEqual(newReps);
    expect(exercise.rest).toEqual(newRest);
    expect(exercise.note).toBe('note update');
    expect(exercise.created_at).toEqual(dateRegisters.created_at);
    expect(exercise.updated_at).toEqual(dateRegisters.updated_at);
    expect(exercise.deleted_at).toEqual(dateRegisters.deleted_at);
  });
});

describe('Failure cases', () => {
  test('Fail on instance exercise with invalid CATEGORY length', () => {
    expect(() => new Exercise(1, trainer, '1', 'chest', reps, rest, dateRegisters, 'note')).toThrow('Category must have length between 2 and 20');
  });

  test('Fail on instance exercise with invalid NAME length', () => {
    expect(() => new Exercise(1, trainer, 'chest', '1', reps, rest, dateRegisters, 'note')).toThrow('Name must have length between 2 and 20');
  });

  test('Fail on instance exercise with invalid note length', () => {
    expect(() => new Exercise(1, trainer, 'chest', 'name', reps, rest, dateRegisters, '1')).toThrow('Note must have length between 2 and 100');
  });

  test('Fail on update exercise with invalid CATEGORY length', () => {
    const exercise = new Exercise(1, trainer, 'chest', 'exercise name', reps, rest, dateRegisters, 'note');
    expect(() => exercise.update({ category: '1' })).toThrow('Category must have length between 2 and 20');
  });

  test('Fail on update exercise with invalid NAME length', () => {
    const exercise = new Exercise(1, trainer, 'chest', 'exercise name', reps, rest, dateRegisters, 'note');
    expect(() => exercise.update({ name: '1' })).toThrow('Name must have length between 2 and 20');
  });

  test('Fail on update exercise with invalid NOTE length', () => {
    const exercise = new Exercise(1, trainer, 'chest', 'exercise name', reps, rest, dateRegisters, 'note');
    expect(() => exercise.update({ note: '1' })).toThrow('Note must have length between 2 and 100');
  });
});
