import { IStudent } from "./IStudent";

export interface IStudentRepository {
  findAll(): Promise<IStudent[]>;
  findById(id: number): Promise<IStudent | null>;
  create(student: IStudent): Promise<IStudent>;
  update(id: number, student: IStudent): Promise<void>;
  delete(id: number): Promise<void>;
}