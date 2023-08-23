import DateRegisters from "../../common/DateRegisters";
import DayTraining from "./DayTraining";

class TrainingSheet {
  constructor(
    private id: number,
    private dayTraining: DayTraining[],
    private dateRegisters: DateRegisters
  ){}
}

export default TrainingSheet;
