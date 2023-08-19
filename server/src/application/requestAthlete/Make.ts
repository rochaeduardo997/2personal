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
    const trainer = await this.userRepository.get(input.trainer_id) as Trainer;
    const athlete = await this.userRepository.get(input.athlete_id) as Athlete;
    const requestAthlete = new RequestAthlete(1, trainer, athlete);
    const result = await this.requestAthleteRepository.make(requestAthlete);
    return {
      id:           result.id,
      trainer_id:   result.trainer.id,
      athlete_id:   result.athlete.id,
      was_accepted: undefined
    };
  }
}

type TOutput = {
  id:           number;
  trainer_id:   number;
  athlete_id:   number;
  was_accepted: undefined;
};

type TInput = {
  trainer_id: number;
  athlete_id: number;
};

export default Make;

