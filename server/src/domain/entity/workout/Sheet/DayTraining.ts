import Exercise from "../Exercise/Exercise";

class DayTraining {
  constructor(
    private _id: number,
    private _day: DAYS,
    private _exercises: Exercise[],
    private _weight?: number,
    private _measure?: string
  ){}

  public update(input: TUpdateInput): boolean{
    if(input.exercises) this.exercises = input.exercises;
    if(input.weight)    this.weight    = input.weight;
    if(input.measure)   this.measure   = input.measure;

    return true;
  }

  public get id(): number {
    return this._id;
  }
  public get day(): DAYS {
    return this._day;
  }
  public get exercises(): Exercise[] {
    return this._exercises;
  }
  public get weight(): number | undefined {
    return this._weight;
  }
  public get measure(): string | undefined {
    return this._measure;
  }

  public set exercises(value: Exercise[]) {
    this._exercises = value;
  }
  public set weight(value: number) {
    this._weight = value;
  }
  public set measure(value: string) {
    this._measure = value;
  }
}

type TUpdateInput = { 
  exercises?: Exercise[];
  weight?: number;
  measure?: string;
};

enum DAYS {
  MONDAY    = 1,
  TUESDAY   = 2,
  WEDNESDAY = 3,
  THURSDAY  = 4,
  FRIDAY    = 5,
  SATURDAY  = 6,
  SUNDAY    = 7
}

export default DayTraining;
