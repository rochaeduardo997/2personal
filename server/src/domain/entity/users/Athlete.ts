import User from './User';
import Trainer from './Trainer';
import DateRegisters from '../common/DateRegisters';

class Athlete extends User{
  constructor(
    protected _id:             number,
    protected _name:           string,
    protected _surname:        string,
    protected _username:       string,
    protected _password:       string,
    protected _email:          string,
    protected _status:         boolean,
    protected _dateRegisters:  DateRegisters = new DateRegisters(),
    private   _trainer?:       Trainer
  ){
    super(_id, _name, _surname, _username, _password, 'athlete', _email, _status, _dateRegisters);
  }

  public update(input: TUpdateInput): boolean{
    if(input.name)                 this.name    = input.name;
    if(input.surname)              this.surname = input.surname;
    if(input.email)                this.validateEmail(input.email);
    if(input.status !== undefined) this.status  = input.status;
    if(input.username)             this.username = input.username;
    if(input.password)             this.password = input.password;

    this.updated_at = new Date();

    return true;
  }

  get trainer(): Trainer | undefined{
    if(this._trainer) return this._trainer;
    else              return;
  }

  set trainer(x: Trainer | undefined){
    this._trainer = x;
  }
}

type TUpdateInput = { 
  name?:     string;
  surname?:  string;
  email?:    string;
  username?: string;
  password?: string;
  status?:   boolean;
  trainer?:  Trainer;
};

export default Athlete;
