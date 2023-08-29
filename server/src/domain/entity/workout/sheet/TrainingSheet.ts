import DateRegisters from "../../common/DateRegisters";
import Athlete from "../../users/Athlete";
import Trainer from "../../users/Trainer";
import DayTraining from "./DayTraining";

class TrainingSheet {
  constructor(
    private _id:            number,
    private _trainer:       Trainer,
    private _athlete:       Athlete,
    private _day_trainings: DayTraining[],
    private _dateRegisters: DateRegisters = new DateRegisters(),
    private _when_change?:  Date
  ){}

  public update(input: TUpdateInput): boolean{
    if(input.when_change) this.when_change = input.when_change;

    this.updated_at = new Date();

    return true;
  }

  public addDayTraining(x: DayTraining): boolean{
    this.alreadyExists(x);
    this.day_trainings.push(x);

    return true;
  }

  private alreadyExists(x: DayTraining): void{
    const has = this.day_trainings.find((dt: DayTraining) => {
      const hasOnWeek = dt.week === x.week;
      const hasOnDay  = dt.day  === x.day;
      return hasOnWeek && hasOnDay;
    });
    if(has) throw new Error('Already exists a training on this day at this week');
    return;
  }

  public removeDayTraining(x: DayTraining): boolean{
    const index = this.day_trainings.findIndex((dt: DayTraining) => dt.id === x.id);
    if(index < 0) throw new Error('Training doesn\'t exists');

    this.day_trainings.splice(index, 1);

    return true;
  }

  public get id(): number {
    return this._id;
  }
  public get trainer(): Trainer {
    return this._trainer;
  }
  public get athlete(): Athlete {
    return this._athlete;
  }
  public get day_trainings(): DayTraining[] {
    return this._day_trainings;
  }
  public get created_at(): Date {
    return this._dateRegisters.created_at;
  }
  public get updated_at(): Date {
    return this._dateRegisters.updated_at;
  }
  public get deleted_at(): Date | undefined {
    return this._dateRegisters.deleted_at;
  }
  public get when_change(): Date | undefined {
    return this._when_change;
  }

  public set updated_at(value: Date) {
    this._dateRegisters.updated_at = value;
  }
  public set when_change(value: Date) {
    this._when_change = value;
  }
}

type TUpdateInput = { 
  when_change?: Date;
};

export default TrainingSheet;
