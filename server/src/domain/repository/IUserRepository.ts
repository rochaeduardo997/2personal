import User from "../entity/User";

interface IUserRepository {
  save(user: User): Promise<User>;
}

export default IUserRepository;

