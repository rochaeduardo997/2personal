import Rest from "../../../../src/domain/entity/workout/exercise/Rest";

describe('Successful cases', () => {
  test('Normal rest', () => {
    const rest = new Rest(30, 2);
    expect(rest.rest).toBe(30);
    expect(rest.type).toBe(2);
  });

  test('Rest without optional field', () => {
    const rest = new Rest();
    expect(rest.rest).toBe(30);
    expect(rest.type).toBe(1);
  });
});
