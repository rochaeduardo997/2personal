class Reps{
  constructor(
    private _sets: number,
    private _reps: number[],
    private _type: string = 'normal'
  ){}

  public get reps(): number[] {
    return this._reps;
  }
  public get type(): string {
    return this._type;
  }
  public get sets(): number {
    return this._sets;
  }
}

export default Reps;
