import { DateModel } from "./Date.model";
import { TimeModel } from "./Time.model";

export interface TenderForm {
  id: string,
  name: string,
  referenceNumber: string,
  releaseDate: DateModel,
  releaseTime: TimeModel,
  closingDate: DateModel,
  closingTime: TimeModel,
  description: string,
  userId: string
}
