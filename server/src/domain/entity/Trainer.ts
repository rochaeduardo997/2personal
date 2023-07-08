import User from './User';
import Athlete from './Athlete';

class Trainer extends User{
  constructor(
    protected _id:             number,
    protected _name:           string,
    protected _surname:        string,
    protected _username:       string,
    protected _password:       string,
    private   _cref:           string,
    protected _status:         boolean,
    private   _plan:           string = 'free',
    private   _students_limit: number = 5,
    private   _athletes:       Athlete[] = [],
    protected _created_at:     Date = new Date(),
    protected _updated_at:     Date = new Date(),
    protected _deleted_at?:    Date
  ){
    super(_id, _name, _surname, _username, _password, 'trainer', _status, _created_at, _updated_at, _deleted_at);

    this.validateStringLength('CREF',    _cref,    3, 30);
    this.validatePlan(_plan);
    this.validateStudentsLimit(_students_limit);
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

  public addAthlete(x: Athlete){
    this._athletes.push(x);
    x.trainer = this;
  }

  public removeAthlete(x: Athlete){
    const index = this._athletes.findIndex((athlete: Athlete) => athlete = x);
    this._athletes.splice(index, 1);
    x.trainer = undefined;
  }

  public update(input: TUpdateInput): boolean{
    if(input.name)                 this.name    = input.name;
    if(input.surname)              this.surname = input.surname;
    if(input.cref)                 this.cref    = input.cref;
    if(input.status !== undefined) this.status  = input.status;
    if(input.plan)                 this.validatePlan(input.plan);
    if(input.students_limit)       this.validateStudentsLimit(input.students_limit);
    if(input.username)             this.username = input.username;
    if(input.password)             this.password = input.password;

    this.updated_at = new Date();

    return true;
  }

  public get cref(): string{
    return this._cref;
  }
  public get plan(){
    return this._plan;
  }
  public get students_limit(){
    return this._students_limit;
  }
  public get athletes(){
    return this._athletes;
  }

  public set cref(x: string){
    this.validateStringLength('CREF', x, 3, 30);
    this._cref = x;
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
  username?:       string;
  password?:       string;
};

export default Trainer;

