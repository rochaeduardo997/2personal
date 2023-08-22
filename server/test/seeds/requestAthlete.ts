import Athlete from "../../src/domain/entity/users/Athlete";
import RequestAthlete from "../../src/domain/entity/users/RequestAthlete";
import Trainer from "../../src/domain/entity/users/Trainer";

function generateRequestAthlete(i: number, trainer: Trainer, athlete: Athlete){
  return new RequestAthlete(i, trainer, athlete);
}

export { generateRequestAthlete };

