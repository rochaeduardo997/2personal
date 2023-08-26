import Exercise from "../Exercise/Exercise";

class DayTraining {
  constructor(
    private _id:        number,
    private _day:       DAYS,
    private _week:      WEEKS,
    private _exercises: Exercise[]
  ){}

  public update(input: TUpdateInput): boolean{
    if(input.exercises) this.exercises = input.exercises;

    return true;
  }

  public get id(): number {
    return this._id;
  }
  public get day(): DAYS {
    return this._day;
  }
  public get week(): WEEKS {
    return this._week;
  }
  public get exercises(): Exercise[] {
    return this._exercises;
  }

  public set exercises(value: Exercise[]) {
    this._exercises = value;
  }
}

type TUpdateInput = { 
  exercises?: Exercise[];
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

enum WEEKS {
  FIRST  = 1,
  SECOND = 2,
  THIRD  = 3,
  FOURTH = 4
}

export default DayTraining;
