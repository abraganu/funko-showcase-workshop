import { ObjectId } from "mongodb";

export type Funko = {
  _id: ObjectId;
  source: string;
  character: string;
  numberInLine: number;
  imageUrl: string;
  yearReleased: string;
};
export interface FunkoProps {
  funkos: Funko[];
  setFunkos: setFunkos;
}
export interface EditFunkoProps {
  funko: Funko;
}
