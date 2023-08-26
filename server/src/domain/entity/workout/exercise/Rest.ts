class Rest{
  constructor(
    private _rest: number = 30,
    private _type: string = 'seconds'
  ){}

  public get type(): string {
    return this._type;
  }
  public get rest(): number {
    return this._rest;
  }
}

export default Rest;
