import User from './User';
import Athlete from './Athlete';
import DateRegisters from '../common/DateRegisters';

class Trainer extends User{
  constructor(
    protected _id:                number,
    protected _name:              string,
    protected _surname:           string,
    protected _username:          string,
    protected _password:          string,
    private   _register:          string,
    protected _email:             string,
    protected _status:            boolean,
    private   _plan:              string = 'free',
    private   _athletes_limit:    number = 5,
    private   _athletes:          Athlete[] = [],
    protected _dateRegisters:     DateRegisters = new DateRegisters(),
    protected _last_remove_date?: Date
  ){
    super(_id, _name, _surname, _username, _password, 'trainer', _email, _status, _dateRegisters);

    this.validateStringLength('Register', _register, 3, 30);
    this.validatePlan(_plan);
    this.validateAthletesLimit(_athletes_limit);
  }

  private validatePlan(plan: string){
    const planTypesRegEx = /free|paid/i.test(plan);

    if(!planTypesRegEx) throw new Error('Plan must be Free or Paid');

    this.plan = plan.toUpperCase();
  }

  private validateAthletesLimit(aL: number){
    const isFreePlan                    = /free/i.test(this.plan);
    const isathletesLimitGreaterThanTen = aL > 5;

    if(isFreePlan && isathletesLimitGreaterThanTen) throw new Error('Free plan can only has 5 athletes');

    this.athletes_limit = aL;
  }

  public addAthlete(x: Athlete): boolean{
    this._athletes.push(x);

    x.trainer = this;

    return true;
  }

  public removeAthlete(x: Athlete): boolean{
    if(!this.canRemoveAthlete()) throw new Error('You only can remove one athlete by day');
    const index = this._athletes.findIndex((athlete: Athlete) => athlete = x);
    this._athletes.splice(index, 1);

    x.trainer = undefined;

    this._last_remove_date = new Date();
    return true;
  }
  private canRemoveAthlete(): boolean{
    if(/paid/i.test(this._plan)) return true;
    if(!this._last_remove_date) return true;

    const today = new Date();
    const lastRemoveWasToday = this._last_remove_date.toDateString() === today.toDateString();
    if(lastRemoveWasToday) return false;
    else                   return true;
  }

  public update(input: TUpdateInput): boolean{
    if(input.name)                 this.name     = input.name;
    if(input.surname)              this.surname  = input.surname;
    if(input.register)             this.register = input.register;
    if(input.email)                this.validateEmail(input.email);
    if(input.status !== undefined) this.status   = input.status;
    if(input.plan)                 this.validatePlan(input.plan);
    if(input.athletes_limit)       this.validateAthletesLimit(input.athletes_limit);
    if(input.username)             this.username = input.username;
    if(input.password)             this.password = input.password;

    this.updated_at = new Date();

    return true;
  }

  public get register(): string{
    return this._register;
  }
  public get plan(){
    return this._plan;
  }
  public get athletes_limit(){
    return this._athletes_limit;
  }
  public get athletes(){
    return this._athletes;
  }
  public get last_remove_date(){
    return this._last_remove_date;
  }

  public set register(x: string){
    this.validateStringLength('Register', x, 3, 30);
    this._register = x;
  }
  public set plan(x: string){
    this._plan = x.toUpperCase();
  }
  public set athletes_limit(x: number){
    this._athletes_limit = x;
  }
}

type TUpdateInput = { 
  name?:           string;
  surname?:        string;
  register?:       string;
  email?:          string;
  status?:         boolean;
  plan?:           string;
  athletes_limit?: number;
  username?:       string;
  password?:       string;
};

export default Trainer;

