import IUserRepository, { TInput } from "../../../src/domain/repository/IUserRepository";
import User from "../../../src/domain/entity/User";

class UserRepositoryMemory implements IUserRepository{
  private users: User[];

  constructor(){
    this.users = [];
  }

  async save(user: User): Promise<User>{
    const hasDuplicatedFields = this.users.some((u: User) => u.username === user.username);
    if(hasDuplicatedFields) throw new Error('Username already in use');

    this.users.push(user);
    return user;
  }

  async get(id: number): Promise<User>{
    const user = this.users.find((u: User) => u.id === id);

    if(!user) throw this.userNotFoundBy(id);

    return user;
  }

  async getAll(): Promise<User[]>{
    return this.users;
  }

  async delete(id: number): Promise<boolean>{
    const index = this.users.findIndex((u: User) => u.id === id);
    if(index < 0) throw this.userNotFoundBy(id);

    this.users.splice(index, 1);
    
    return true;
  }

  async update(user: User): Promise<User>{
    this.delete(user.id);

    this.users.push(user);

    return user;
  }

  async login(input: TInput): Promise<User>{
    const user = this.users.find((u: User) => {
      const regexp = new RegExp(`\\b(${input.login})\\b`, 'gi');

      const sameLogin = (u.username.match(regexp)); //|| (u.email.match(regexp));
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

