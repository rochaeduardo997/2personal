import IRequestAthleteRepository from '../../domain/repository/IRequestAthleteRepository';
import IUserRepository from '../../domain/repository/IUserRepository';
import RequestAthlete from '../../domain/entity/RequestAthlete';

class RequestAthleteRepositoryMemory implements IRequestAthleteRepository {
  private requestAthletes: RequestAthlete[];

  constructor(private userRepository: IUserRepository){
    this.requestAthletes = [];
  }

  async getAllByAthlete(id: number): Promise<RequestAthlete[]>{
    return this.requestAthletes.filter((a: RequestAthlete) => a.athlete.id === id);
  }

  async getAllByTrainer(id: number): Promise<RequestAthlete[]>{
    return this.requestAthletes.filter((a: RequestAthlete) => a.trainer.id === id);
  }

  async make(requestAthlete: RequestAthlete): Promise<boolean>{
    this.requestValidation(requestAthlete);
    this.requestAthletes.push(requestAthlete);
    return true;
  }

  private requestValidation(requestAthlete: RequestAthlete): void{
    const result = this.requestAthletes.find((r: RequestAthlete) => {
      const sameTrainer = r.trainer === requestAthlete.trainer;
      const sameAthlete = r.athlete === requestAthlete.athlete;
      return sameTrainer && sameAthlete;
    });

    if(result) throw new Error(`You've already made a solicitation to ${requestAthlete.athlete.fullname}`);

    return;
  }
}

export default RequestAthleteRepositoryMemory;

