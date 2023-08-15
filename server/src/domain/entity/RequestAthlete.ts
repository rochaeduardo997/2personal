import Trainer from './Trainer';
import Athlete from './Athlete';

class RequestAthlete {
  constructor(
    private _id: number,
    private _trainer: Trainer,
    private _athlete: Athlete,
    private _wasAccepted?: boolean
  ){}

  handle(id: number, accept: boolean = true){
    if(id === this._athlete.id) this._wasAccepted = accept;
    else throw new Error('Athlete doesnt\'t have this trainer request');
  }

  get id(): number{
    return this._id;
  }
  get trainer(): Trainer{
    return this._trainer;
  }
  get athlete(): Athlete{
    return this._athlete;
  }
  get wasAccepted(): boolean|undefined{
    return this._wasAccepted;
  }
}

export default RequestAthlete;

