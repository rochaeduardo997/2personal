import Athlete from "../../src/domain/entity/users/Athlete";
import Trainer from "../../src/domain/entity/users/Trainer";
import User from "../../src/domain/entity/users/User";

function generateUser(i: number){
  return new User(i, `name ${i}`,  `surname ${i}`,  `username${i}`,  `password${i}`,  'admin', `email${i}@email.com`, true);
}

function generateTrainer(i: number, athletes?: Athlete[]){
  return new Trainer(i, `name ${i}`, `surname ${i}`, `trainer_username${i}`, `password${i}`, `0000${i}-ce`, `email${i}@email.com`, true, 'free', 5, athletes);
}

function generateAthlete(i: number){
  return new Athlete(i, `name ${i}`, `surname ${i}`, `athlete_username${i}`, `password${i}`, `email${i}@email.com`, true);
}

export { 
  generateUser, 
  generateTrainer,
  generateAthlete
};

