import User from "../entity/User";
import Trainer from "../entity/Trainer";
import Athlete from "../entity/Athlete";

interface IUserRepository {
  save<T extends TUserTypes>(user: T): Promise<T>;
  get(id: number): Promise<TUserTypes>;
  getAll(role?: string): Promise<(TUserTypes)[]>;
  delete(id: number): Promise<boolean>;
  update<T extends TUserTypes>(user: T): Promise<T>;
  login(input: TInput): Promise<TUserTypes>;
}

type TInput = {
  login:     string;
  password:  string;
};

type TUserTypes = (User | Trainer | Athlete);

export { TInput, TUserTypes };

export default IUserRepository;

