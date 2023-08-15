import IUserRepository from '../../domain/repository/IUserRepository';

class Delete{
  constructor(private userRepository: IUserRepository){}

  async execute(id: number): Promise<boolean>{
    await this.userRepository.delete(id);
    return true;
  }
}

export default Delete;

