import Athlete from "../../../domain/entity/users/Athlete";
import RequestAthlete from "../../../domain/entity/users/RequestAthlete";
import Trainer from "../../../domain/entity/users/Trainer";
import IRequestAthleteRepository from "../../../domain/repository/users/IRequestAthleteRepository";
import IUserRepository from "../../../domain/repository/users/IUserRepository";

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

