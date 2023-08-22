import IRequestAthleteRepository from "../../../domain/repository/users/IRequestAthleteRepository";

class GetAllByAthlete{
  constructor(private requestAthleteRepository: IRequestAthleteRepository){}

  async execute(id: number): Promise<TOutput[]>{
    const result: TOutput[] = [];

    const requests = await this.requestAthleteRepository.getAllByAthlete(id);
    for(const request of requests){
      result.push({
        id:           request.id,
        athlete_id:   request.athlete.id,
        trainer_id:   request.trainer.id,
        was_accepted: request.was_accepted
      });
    }

    return result;
  }
}

type TOutput = {
  id:           number;
  athlete_id:   number;
  trainer_id:   number;
  was_accepted: boolean | undefined;
};

export default GetAllByAthlete;

