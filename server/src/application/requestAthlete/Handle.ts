import IRequestAthleteRepository from '../../domain/repository/IRequestAthleteRepository';

class Handle{
  constructor(private requestAthleteRepository: IRequestAthleteRepository){}

  async execute(input: TInput): Promise<boolean>{
    const request = this.requestAthleteRepository.handle(input.id, input.athlete_id, input.was_accepted);
    return request;
  }
}

type TInput = {
  id:           number;
  athlete_id:   number;
  was_accepted: boolean;
};

export default Handle;

