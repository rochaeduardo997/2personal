import RequestAthlete from '../entity/RequestAthlete';

interface IRequestAthleteRepository{
  getAllByAthlete(id: number): Promise<RequestAthlete[]>;
  getAllByTrainer(id: number): Promise<RequestAthlete[]>;
  make(requestAthlete: RequestAthlete): Promise<boolean>;
}

export default IRequestAthleteRepository;

