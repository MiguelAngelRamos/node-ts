import { IStudent } from "../interfaces/IStudent";
import { IStudentRepository } from "../interfaces/IStudentRepository";
import { IStudentService } from "../interfaces/IStudentService";

export class StudentService implements IStudentService {

  constructor(private readonly studentRepository: IStudentRepository) {}

  getAllStudents(): Promise<IStudent[]> {
    return this.studentRepository.findAll();
  }
  
  getStudentById(id: number): Promise<IStudent | null> {
    return this.studentRepository.findById(id);
  }

  createStudent(student: IStudent): Promise<IStudent> {
    return this.studentRepository.create(student);
  }
  updateStudent(id: number, student: IStudent): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteStudent(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

}