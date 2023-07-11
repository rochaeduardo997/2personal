import User from "../entity/User";

interface IUserRepository {
  save(user: User): Promise<User>;
  get(id: number): Promise<User>;
  getAll(): Promise<User[]>;
  delete(id: number): Promise<boolean>;
  update(user: User): Promise<User>;
}

export default IUserRepository;

