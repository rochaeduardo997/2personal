import Trainer from './Trainer';
import Athlete from './Athlete';

class RequestAthlete {
  constructor(
    private _id: number,
    private _trainer: Trainer,
    private _athlete: Athlete,
    private _was_accepted?: boolean
  ){}

  handle(id: number, accept: boolean = true){
    if(id === this._athlete.id) {
      this._was_accepted = accept;
      if(this._was_accepted) this._athlete.trainer = this._trainer;
    }
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
  get was_accepted(): boolean|undefined{
    return this._was_accepted;
  }
}

export default RequestAthlete;

