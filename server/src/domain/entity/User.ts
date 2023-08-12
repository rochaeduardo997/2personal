class User{
  constructor(
    protected _id:          number,
    protected _name:        string,
    protected _surname:     string,
    protected _username:    string,
    protected _password:    string,
    protected _role:        string,
    protected _email:       string,
    protected _status:      boolean,
    protected _created_at:  Date = new Date(),
    protected _updated_at:  Date = new Date(),
    protected _deleted_at?: Date
  ){
    this.validateStringLength('Name',     _name,    3, 30);
    this.validateStringLength('Surname',  _surname, 3, 30);
    this.validateStringLength('Username', _username, 3, 20);
    this.validateRole(_role);
    this.validateEmail(_email);
  }

  protected validateStringLength(field: string, value: string, minSize: number, maxSize: number): void{
    const stringSmallerThanThree  = value?.length < minSize;
    const stringGreaterThanThirty = value?.length > maxSize;

    if(stringSmallerThanThree || stringGreaterThanThirty) 
      throw new Error(`${field} must have length between ${minSize} and ${maxSize}`);

    return;
  }

  private validateRole(x: string){
    if(!/admin|trainer|athlete/i.test(x)) throw new Error('User role must be Admin, Trainer or Athlete.');
    this.role = x;
  }

  protected validateEmail(x: string){
    const emailRegExp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    if(!x.match(emailRegExp)) throw new Error('Invalid email format');
    this.email = x.toLowerCase();
  }

  public update(input: TUpdateInput): boolean{
    if(input.name)                 this.name    = input.name;
    if(input.surname)              this.surname = input.surname;
    if(input.username)             this.username = input.username;
    if(input.password)             this.password = input.password;
    if(input.role)                 this.validateRole(input.role);
    if(input.email)                this.validateEmail(input.email);
    if(input.status !== undefined) this.status = input.status;

    this.updated_at = new Date();

    return true;
  }

  public get id(): number{
    return this._id;
  }
  public get name(): string{
    return this._name;
  }
  public get surname(): string{
    return this._surname;
  }
  public get fullname(): string{
    return `${this.name} ${this.surname}`;
  }
  public get username(): string{
    return this._username;
  }
  public get password(): string{
    return this._password;
  }
  public get role(): string{
    return this._role;
  }
  public get email(): string{
    return this._email;
  }
  public get status(): boolean{
    return this._status;
  }
  public get created_at(): Date{
    return this._created_at;
  }
  public get updated_at(): Date{
    return this._updated_at;
  }
  public get deleted_at(): Date | undefined{
    return this._deleted_at;
  }

  public set name(x: string){
    this.validateStringLength('Name', x, 3, 30);
    this._name = x;
  }
  public set surname(x: string){
    this.validateStringLength('Surname', x, 3, 30);
    this._surname = x;
  }
  public set username(x: string){
    this.validateStringLength('Username', x, 3, 20);
    this._username = x;
  }
  public set password(x: string){
    this._password = x;
  }
  public set role(x: string){
    this._role = x.toUpperCase();
  }
  public set email(x: string){
    this._email = x.toLowerCase();
  }
  public set status(x: boolean){
    this._status = x;
  }
  public set updated_at(x: Date){
    this._updated_at = x;
  }
  public set deleted_at(x: Date){
    this._deleted_at = x;
  }
}

type TUpdateInput = { 
  name?:           string;
  surname?:        string;
  status?:         boolean;
  username?:       string;
  password?:       string;
  role?:           string;
  email?:          string;
};

export default User;

