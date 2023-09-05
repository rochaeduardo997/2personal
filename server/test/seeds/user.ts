import Athlete from "../../src/domain/entity/users/Athlete";
import Trainer from "../../src/domain/entity/users/Trainer";
import User from "../../src/domain/entity/users/User";
import { generateDateRegisters } from "./common";

const dateRegisters = generateDateRegisters(1);

function generateUser(i: number){
  return new User(i, `name ${i}`,  `surname ${i}`,  `username${i}`,  `password${i}`,  'admin', `email${i}@email.com`, true, dateRegisters);
}

function generateTrainer(i: number){
  const trainer = new Trainer(i, `name ${i}`, `surname ${i}`, `trainer_username${i}`, `password${i}`, `0000${i}-ce`, `email${i}@email.com`, true, 'free', 5, [], dateRegisters);
  return trainer;
}

function generateAthlete(i: number, trainer?: Trainer){
  return new Athlete(i, `name ${i}`, `surname ${i}`, `athlete_username${i}`, `password${i}`, `email${i}@email.com`, true, dateRegisters, trainer);
}

export { 
  generateUser, 
  generateTrainer,
  generateAthlete
};
