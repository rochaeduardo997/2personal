import DateRegisters from "../../../src/domain/entity/common/DateRegisters";

let dateRegisters: DateRegisters;

beforeAll(() => {
  dateRegisters = new DateRegisters(new Date('2022-01-01'), new Date('2022-02-02'), new Date('2022-03-03'));
});

test('Date registers', () => {
  expect(dateRegisters.created_at).toEqual(new Date('2022-01-01'));
  expect(dateRegisters.updated_at).toEqual(new Date('2022-02-02'));
  expect(dateRegisters.deleted_at).toEqual(new Date('2022-03-03'));
});
