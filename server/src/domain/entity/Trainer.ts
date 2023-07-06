class Trainer {
  constructor(
    private _id:             number,
    private _name:           string,
    private _surname:        string,
    private _cref:           string,
    private _status:         boolean,
    private _plan:           string = 'free',
    private _students_limit: number = 5
  ){
    this.validateStringLength('Name',    _name,    3, 30);
    this.validateStringLength('Surname', _surname, 3, 30);
    this.validateStringLength('CREF',    _cref,    3, 30);
    this.validatePlan(_plan);
    this.validateStudentsLimit(_students_limit);
  }

  private validateStringLength(field: string, value: string, minSize: number, maxSize: number): void{
    const stringSmallerThanThree  = value.length < minSize;
    const stringGreaterThanThirty = value.length > maxSize;

    if(stringSmallerThanThree || stringGreaterThanThirty) 
      throw new Error(`${field} must have length between ${minSize} and ${maxSize}`);

    return;
  }

  private validatePlan(plan: string){
    const planTypesRegEx = /free|paid/i.test(plan);

    if(!planTypesRegEx) throw new Error('Plan must be Free or Paid');

    this.plan = plan.toUpperCase();
  }

  private validateStudentsLimit(sL: number){
    const isFreePlan                    = /free/i.test(this.plan);
    const isStudentsLimitGreaterThanTen = sL > 5;

    if(isFreePlan && isStudentsLimitGreaterThanTen) throw new Error('Free plan can only has 5 students');

    this.students_limit = sL;
  }

  public update(input: TUpdateInput): boolean{
    if(input.name)                 this.name    = input.name;
    if(input.surname)              this.surname = input.surname;
    if(input.cref)                 this.cref    = input.cref;
    if(input.status !== undefined) this.status  = input.status;
    if(input.plan)                 this.validatePlan(input.plan);
    if(input.students_limit)       this.validateStudentsLimit(input.students_limit);
    return true;
  }

  public get id(): number{
    return this._id;
  }
  public get name(): string{
    return this._name;
  }
  public get surname(): string | undefined{
    return this._surname;
  }
  public get fullname(): string{
    return `${this.name} ${this.surname}`;
  }
  public get cref(): string{
    return this._cref;
  }
  public get status(): boolean{
    return this._status;
  }
  public get plan(){
    return this._plan;
  }
  public get students_limit(){
    return this._students_limit;
  }

  public set name(x: string){
    this.validateStringLength('Name', x, 3, 30);
    this._name = x;
  }
  public set surname(x: string){
    this.validateStringLength('Surname', x, 3, 30);
    this._surname = x;
  }
  public set cref(x: string){
    this.validateStringLength('CREF', x, 3, 30);
    this._cref = x;
  }
  public set status(x: boolean){
    this._status = x;
  }
  public set plan(x: string){
    this._plan = x.toUpperCase();
  }
  public set students_limit(x: number){
    this._students_limit = x;
  }
}

type TUpdateInput = { 
  name?:           string;
  surname?:        string;
  cref?:           string;
  status?:         boolean;
  plan?:           string;
  students_limit?: number;
};

export default Trainer;

