import User from "../../src/domain/entity/User";
import Trainer from "../../src/domain/entity/Trainer";
import Athlete from "../../src/domain/entity/Athlete";

function generateUser(i: number){
  return new User(i, `name ${i}`,  `surname ${i}`,  `username${i}`,  `password${i}`,  'admin', `email${i}@email.com`, true);
}

function generateTrainer(i: number, athletes?: Athlete[]){
  return new Trainer(i, `name ${i}`, `surname ${i}`, `username${i}`, `password${i}`, `0000${i}-ce`, `email${i}@email.com`, true, 'free', 5, athletes);
}

function generateAthlete(i: number){
  return new Athlete(i, `name ${i}`, `surname${i}`, `username${i}`, `password${i}`, `email${i}@email.com`, true);
}

export { 
  generateUser, 
  generateTrainer,
  generateAthlete
};

