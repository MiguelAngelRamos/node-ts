import { RowDataPacket } from "mysql2";
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
  
  async findById(id: number): Promise<IStudent | null> {
    console.log(id);
    const connection = await this.getConnection();
    // const [element1]  =  [[1],[2]]
    // element1 = [1]
    // element1[0] = 1
    try {
      const [rows] = await connection.execute<RowDataPacket[]>("SELECT * FROM students WHERE id = ?", [id]);
      console.log(rows);
      console.log(rows[0]);
      return rows[0] as unknown as IStudent;
    } catch (error) {
      throw new Error("Error" +  error);
    } finally {
      connection.release();
    }
  }
  async create(student: IStudent): Promise<IStudent> {
    const connection = await this.getConnection();
    try {
      await connection.execute("INSERT INTO students (name, age) VALUES (?,?)", [student.name, student.age]);
      return student;
    } catch (error) {
      throw new Error("Error" + error);
    } finally {
      connection.release();
    }
  }

  update(id: number, student: IStudent): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async delete(id: number): Promise<void> {
    const connection = await this.getConnection();
    try {
      await connection.execute("DELETE FROM students WHERE id = ?", [id]);
    } catch (error) {
      throw new Error("Error" + error);
    }
    finally {
      connection.release();
    }
  }

}