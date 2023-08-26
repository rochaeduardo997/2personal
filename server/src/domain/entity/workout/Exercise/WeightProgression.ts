import DayTraining from "../Sheet/DayTraining";
import Exercise from "./Exercise";

class WeightProgression{
  constructor(
    private _id:          number,
    private _weight:      number,
    private _measure:     string,
    private _exercise:    Exercise,
    private _dayTraining: DayTraining
  ){}

  public update(input: TUpdateInput): boolean{
    if(input.weight)  this.weight = input.weight;
    if(input.measure) this.measure = input.measure;

    return true;
  }

  public get id(): number {
    return this._id;
  }
  public get weight(): number {
    return this._weight;
  }
  public get measure(): string {
    return this._measure;
  }
  public get exercise(): Exercise {
    return this._exercise;
  }
  public get dayTraining(): DayTraining {
    return this._dayTraining;
  }

  public set weight(value: number) {
    this._weight = value;
  }
  public set measure(value: string) {
    this._measure = value;
  }
}

type TUpdateInput = { 
  weight?:  number;
  measure?: string;
};

export default WeightProgression;
