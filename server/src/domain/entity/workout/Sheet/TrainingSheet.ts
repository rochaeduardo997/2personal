import DateRegisters from "../../common/DateRegisters";
import Athlete from "../../users/Athlete";
import Trainer from "../../users/Trainer";
import DayTraining from "./DayTraining";

class TrainingSheet {
  constructor(
    private _id:            number,
    private _trainer:       Trainer,
    private _athlete:       Athlete,
    private _dayTrainings:  DayTraining[],
    private _dateRegisters: DateRegisters,
    private _when_change:   Date
  ){}

  public get id(): number {
    return this._id;
  }
  public get trainer(): Trainer {
    return this._trainer;
  }
  public get athlete(): Athlete {
    return this._athlete;
  }
  public get dayTrainings(): DayTraining[] {
    return this._dayTrainings;
  }
  public get dateRegisters(): DateRegisters {
    return this._dateRegisters;
  }
  public get when_change(): Date {
    return this._when_change;
  }

  public set id(value: number) {
    this._id = value;
  }
  public set dateRegisters(value: DateRegisters) {
    this._dateRegisters = value;
  }
  public set when_change(value: Date) {
    this._when_change = value;
  }
}

export default TrainingSheet;
