import Trainer from '../../src/domain/entity/Trainer';
import Athlete from '../../src/domain/entity/Athlete';
import RequestAthlete from '../../src/domain/entity/RequestAthlete';

function generateRequestAthlete(i: number, trainer: Trainer, athlete: Athlete){
  return new RequestAthlete(i, trainer, athlete);
}

export { generateRequestAthlete };

