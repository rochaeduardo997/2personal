class Rest{
  constructor(
    private _rest: number = 30,
    private _type: TYPES  = 1
  ){}

  public get type(): TYPES {
    return this._type;
  }
  public get rest(): number {
    return this._rest;
  }
}

enum TYPES {
  SECONDS = 1,
  MINUTES = 2
}

export default Rest;
