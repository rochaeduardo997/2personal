class DateRegisters{
  constructor(
    private _created_at: Date = new Date(),
    private _updated_at: Date = new Date(),
    private _deleted_at?: Date
  ){}

  public get created_at(): Date {
    return this._created_at;
  }
  public get updated_at(): Date {
    return this._updated_at;
  }
  public get deleted_at(): Date | undefined {
    return this._deleted_at;
  }

  public set updated_at(x: Date) {
    this._updated_at = x;
  }

  public set deleted_at(x: Date) {
    this._deleted_at = x;
  }
}

export default DateRegisters;
