import User from "../../../domain/entity/users/User";
import IUserRepository, { TUserTypes, TInput } from "../../../domain/repository/users/IUserRepository";

class UserRepositoryMemory implements IUserRepository{
  private users: Array<TUserTypes>;

  constructor(){
    this.users = [];
  }

  async save<T extends TUserTypes>(user: T): Promise<T>{
    const hasDuplicatedFields = this.users.some((u: User) => u.username === user.username);

    if(hasDuplicatedFields) throw new Error('Username already in use');

    this.users.push(user);

    return user;
  }

  async get(id: number): Promise<TUserTypes>{
    const user = this.users.find((u: User) => u.id === id);

    if(!user) throw this.userNotFoundBy(id);

    return user;
  }

  async getAll(role: string): Promise<(TUserTypes)[]>{
    if(role) return this.users.filter((u: TUserTypes) => u.role.match(new RegExp(`\\b(${role})\\b`, 'i')));
    else return this.users;
  }

  async delete(id: number): Promise<boolean>{
    const index = this.users.findIndex((u: User) => u.id === id);

    if(index < 0) throw this.userNotFoundBy(id);

    this.users.splice(index, 1);
    
    return true;
  }

  async update<T extends TUserTypes>(user: T): Promise<T>{
    this.delete(user.id);

    this.users.push(user);

    return user;
  }

  async login(input: TInput): Promise<TUserTypes>{
    const user = this.users.find((u: User) => {
      const regexp = new RegExp(`\\b(${input.login})\\b`, 'gi');

      const sameLogin = (u.username.match(regexp) || (u.email.match(regexp)));
      const samePassword = u.password === input.password;

      return sameLogin?.length && samePassword;
    });

    if(!user) throw new Error('Login failed, verify provided credentials');

    return user;
  }

  private userNotFoundBy(id: number): Error{
    return new Error(`User not found by id ${id}`);
  }
}

export default UserRepositoryMemory;

