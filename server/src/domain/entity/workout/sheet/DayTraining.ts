import Exercise from "../exercise/Exercise";
import WeightProgression from "../exercise/WeightProgression";

class DayTraining {
  constructor(
    private _id:                 number,
    private _day:                DAYS,
    private _week:               WEEKS,
    private _exercises:          Exercise[][],
    private _weight_progression: WeightProgression[] = []
  ){}

  public update(input: TUpdateInput): boolean{
    if(input.exercises) this.exercises = input.exercises;

    return true;
  }

  public addWeightProgression(x: WeightProgression): boolean{
    this.hasExercise(x.exercise);
    this.hasWeightProgressionForExercise(x.exercise);

    this.weight_progression.push(x);
    return true;
  }
  private hasExercise(x: Exercise){
    const hasExercise = this.exercises.some((e1: Exercise[]) => {
      return e1.some((e2: Exercise) => e2 === x);
    });
    if(!hasExercise) throw new Error('Exercise doesn\'t exists on day training');
  }
  private hasWeightProgressionForExercise(x: Exercise){
    const hasExercise = this.weight_progression.some((w: WeightProgression) => w.exercise === x);
    if(hasExercise) throw new Error('Weight progression already exists for this exercise');
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
  public get exercises(): Exercise[][] {
    return this._exercises;
  }
  public get weight_progression(): WeightProgression[] {
    return this._weight_progression;
  }

  public set exercises(value: Exercise[][]) {
    this._exercises = value;
  }
}

type TUpdateInput = { 
  exercises?: Exercise[][];
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
