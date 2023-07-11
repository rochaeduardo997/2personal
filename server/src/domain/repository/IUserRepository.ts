import User from "../entity/User";

interface IUserRepository {
  save(user: User): Promise<User>;
  get(id: number): Promise<User>;
}

export default IUserRepository;

