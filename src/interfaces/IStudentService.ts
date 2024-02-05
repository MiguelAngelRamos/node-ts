import {IStudent } from './IStudent';
export interface IStudentService {
  getAllStudents(): Promise<IStudent[]>;
  getStudentById(id: number): Promise<IStudent | null>;
  createStudent(student: IStudent): Promise<IStudent>;
  updateStudent(id: number,student: IStudent): Promise<void>;
  deleteStudent(id: number): Promise<void>;
}