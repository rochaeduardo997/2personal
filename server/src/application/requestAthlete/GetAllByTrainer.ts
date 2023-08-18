import IUserRepository from '../../domain/repository/IUserRepository';
import IRequestAthleteRepository from '../../domain/repository/IRequestAthleteRepository';

class GetAllByTrainer{
  constructor(private requestAthleteRepository: IRequestAthleteRepository){}

  async execute(id: number): Promise<TOutput[]>{
    const result: TOutput[] = [];

    const requests = await this.requestAthleteRepository.getAllByTrainer(id);
    for(const request of requests){
      result.push({
        id:        request.id,
        athleteId: request.athlete.id,
        trainerId: request.trainer.id,
        status:    request.wasAccepted
      });
    }

    return result;
  }
}

type TOutput = {
  id:        number;
  athleteId: number;
  trainerId: number;
  status:    boolean | undefined;
};

export default GetAllByTrainer;
