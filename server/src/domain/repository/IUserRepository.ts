import User from "../entity/User";

interface IUserRepository {
  save(user: User): Promise<User>;
  get(id: number): Promise<User>;
  getAll(): Promise<User[]>;
  delete(id: number): Promise<boolean>;
  update(user: User): Promise<User>;
  login(input: TInput): Promise<User>;
}

type TInput = {
  login:    string;
  password: string;
};

export { TInput };

export default IUserRepository;

