import Rest from "../../../../src/domain/entity/workout/Exercise/Rest";

describe('Successful cases', () => {
  test('Normal rest', () => {
    const rest = new Rest(30, 'minutes');
    expect(rest.rest).toBe(30);
    expect(rest.type).toBe('minutes');
  });

  test('Rest without optional field', () => {
    const rest = new Rest();
    expect(rest.rest).toBe(30);
    expect(rest.type).toBe('seconds');
  });
});
