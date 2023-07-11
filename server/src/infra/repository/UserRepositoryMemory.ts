import IUserRepository from "../../../src/domain/repository/IUserRepository";
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

  async get(id: number){
    const user = this.users.find((u: User) => u.id === id);

    if(!user) throw new Error(`User not found by id ${id}`);

    return user;
  }
}

export default UserRepositoryMemory;
