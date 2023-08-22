import RequestAthlete from "../../domain/entity/users/RequestAthlete";
import IRequestAthleteRepository from "../../domain/repository/users/IRequestAthleteRepository";

class RequestAthleteRepositoryMemory implements IRequestAthleteRepository {
  private requestAthletes: RequestAthlete[];

  constructor(){
    this.requestAthletes = [];
  }

  async getAllByAthlete(id: number): Promise<RequestAthlete[]>{
    return this.requestAthletes.filter((a: RequestAthlete) => a.athlete.id === id);
  }

  async getAllByTrainer(id: number): Promise<RequestAthlete[]>{
    return this.requestAthletes.filter((a: RequestAthlete) => a.trainer.id === id);
  }

  async handle(id: number, athlete_id: number, was_accepted: boolean): Promise<boolean>{
    const request = this.requestAthletes.find((r: RequestAthlete) => {
      const sameRequest = r.id === id
      const sameAthlete = r.athlete.id === athlete_id;
      return sameRequest && sameAthlete;
    });

    if(!request) throw new Error('Request doesn\'t exists');
    request.handle(athlete_id, was_accepted);

    return true;
  }

  async make(requestAthlete: RequestAthlete): Promise<RequestAthlete>{
    this.requestValidation(requestAthlete);
    this.requestAthletes.push(requestAthlete);

    return requestAthlete;
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

