import User from './User';
import Trainer from './Trainer';

class Athlete extends User{
  constructor(
    protected _id:             number,
    protected _name:           string,
    protected _surname:        string,
    protected _username:       string,
    protected _password:       string,
    protected _email:          string,
    protected _status:         boolean,
    private   _trainer?:       Trainer,
    protected _created_at:     Date = new Date(),
    protected _updated_at:     Date = new Date(),
    protected _deleted_at?:    Date
  ){
    super(_id, _name, _surname, _username, _password, 'athlete', _email, _status, _created_at, _updated_at, _deleted_at);
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

