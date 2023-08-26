import Reps from "../../../../src/domain/entity/workout/exercise/Reps";

describe('Successful cases', () => {
  test('Normal reps', () => {
    const reps = new Reps(3, [ 10, 15, 20 ], 'seconds');
    expect(reps.sets).toBe(3);
    expect(reps.reps).toEqual([ 10, 15, 20 ]);
    expect(reps.type).toBe('seconds');
  });

  test('Reps without optional field', () => {
    const reps = new Reps(3, [ 10 ]);
    expect(reps.sets).toBe(3);
    expect(reps.reps).toEqual([ 10 ]);
    expect(reps.type).toBe('normal');
  });
});
