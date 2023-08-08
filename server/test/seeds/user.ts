import User from "../../src/domain/entity/User";

function generateUser(i: number){
  return new User(i, `name ${i}`,  `surname ${1}`,  `username ${i}`,  'password',  'admin', true);
}

export { generateUser };

