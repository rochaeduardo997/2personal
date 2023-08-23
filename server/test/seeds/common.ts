import DateRegisters from "../../src/domain/entity/common/DateRegisters";

function generateDateRegisters(i: number, deleted_at: boolean = false){
  const deleted = deleted_at ? new Date(`2022-${i + 2}-0${i + 2}`) : undefined;
  return new DateRegisters(new Date(`2022-0${i}-0${i}`), new Date(`2022-0${i + 1}-0${i + 1}`), deleted);
}

export { generateDateRegisters };
