import IRequestAthleteRepository from '../../../src/domain/repository/IRequestAthleteRepository';
import IUserRepository from '../../../src/domain/repository/IUserRepository';
import RequestAthlete from '../../../src/domain/entity/RequestAthlete';
import Trainer from '../../../src/domain/entity/Trainer';
import Athlete from '../../../src/domain/entity/Athlete';

class Make{
  constructor(
    private requestAthleteRepository: IRequestAthleteRepository,
    private userRepository: IUserRepository
  ){}

  async execute(input: TInput): Promise<TOutput>{
    const trainer = await this.userRepository.get(input.trainerId) as Trainer;
    const athlete = await this.userRepository.get(input.athleteId) as Athlete;
    const requestAthlete = new RequestAthlete(1, trainer, athlete);
    const result = await this.requestAthleteRepository.make(requestAthlete);
    return {
      id:        result.id,
      trainerId: result.trainer.id,
      athleteId: result.athlete.id,
      status:    undefined
    };
  }
}

type TOutput = {
  id:        number;
  trainerId: number;
  athleteId: number;
  status:    undefined;
};

type TInput = {
  trainerId: number;
  athleteId: number;
};

export default Make;

