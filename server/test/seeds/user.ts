import User from "../../src/domain/entity/User";

function generateUser(i: number){
  return new User(i, `name ${i}`,  `surname ${1}`,  `username ${i}`,  `password${i}`,  'admin', `email${i}@email.com`, true);
}

export { generateUser };

