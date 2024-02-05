import { MysqlConnection } from "../database/MysqlConnection";
import { IStudent } from "../interfaces/IStudent";
import { IStudentRepository } from "../interfaces/IStudentRepository";

export class MysqlStudentRepository implements IStudentRepository {

  constructor(private readonly dbConnection: MysqlConnection) {}

  private async getConnection() {
    return this.dbConnection.getConnection();
  }

  async findAll(): Promise<IStudent[]> {
    const connection = await this.getConnection();

    try {
      const [rows] = await connection.execute("SELECT * FROM students");
      return rows as IStudent[];
    } catch (error) {
      throw new Error("Error" + error);
    } finally {
      connection.release();
    }
  }
  
  findById(id: number): Promise<IStudent | null> {
    throw new Error("Method not implemented.");
  }
  create(student: IStudent): Promise<IStudent> {
    throw new Error("Method not implemented.");
  }
  update(id: number, student: IStudent): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

}