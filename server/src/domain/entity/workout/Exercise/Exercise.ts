import DateRegisters from "../../common/DateRegisters";
import Trainer from "../../users/Trainer";
import Reps from "./Reps";
import Rest from "./Rest";

class Exercise{
  constructor(
    private _id:            number,
    private _trainer:       Trainer,
    private _category:      string,
    private _name:          string,
    private _reps:          Reps,
    private _rest:          Rest,
    private _dateRegisters: DateRegisters,
    private _note?:         string
  ){
    this.validateStringLength('Category',       _category, 2, 20);
    this.validateStringLength('Name',           _name,     2, 20);
    if(_note) this.validateStringLength('Note', _note,     2, 100);
  }

  protected validateStringLength(field: string, value: string, minSize: number, maxSize: number): void{
    const stringSmallerThanThree  = value?.length < minSize;
    const stringGreaterThanThirty = value?.length > maxSize;

    if(stringSmallerThanThree || stringGreaterThanThirty) 
      throw new Error(`${field} must have length between ${minSize} and ${maxSize}`);

    return;
  }

  public update(input: TUpdateInput): boolean{
    if(input.category) this.category = input.category;
    if(input.name) this.name = input.name;
    if(input.reps) this.reps = input.reps;
    if(input.rest) this.rest = input.rest;
    if(input.note) this.note = input.note;

    this._dateRegisters.updated_at = new Date();

    return true;
  }

  public get id(): number {
    return this._id;
  }
  public get trainer(): Trainer {
    return this._trainer;
  }
  public get category(): string {
    return this._category;
  }
  public get name(): string {
    return this._name;
  }
  public get reps(): Reps {
    return this._reps;
  }
  public get rest(): Rest {
    return this._rest;
  }
  public get note(): string | undefined {
    return this._note;
  }
  public get created_at(): Date{
    return this._dateRegisters.created_at;
  }
  public get updated_at(): Date{
    return this._dateRegisters.updated_at;
  }
  public get deleted_at(): Date | undefined{
    return this._dateRegisters.deleted_at;
  }

  public set category(x: string) {
    this.validateStringLength('Category', x, 2, 20);
    this._category = x;
  }
  public set name(x: string) {
    this.validateStringLength('Name', x, 2, 20);
    this._name = x;
  }
  public set reps(x: Reps) {
    this._reps = x;
  }
  public set rest(x: Rest) {
    this._rest = x;
  }
  public set note(x: string) {
    this.validateStringLength('Note', x, 2, 100);
    this._note = x;
  }
}

type TUpdateInput = { 
  category?: string;
  name?:     string;
  reps?:     Reps;
  rest?:     Rest;
  note?:     string;
};

export default Exercise;
