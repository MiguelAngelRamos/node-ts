import { GET, route } from "awilix-express";
import { Request, Response, Router } from "express";
import { IStudentService } from "../interfaces/IStudentService";

@route('/students')
export class StudentController {

  public router: Router;

  constructor(private readonly studentService: IStudentService) {
    this.router = Router();
    this.router.get('/', this.all.bind(this));
  }

  @GET()
  public async all(req: Request, res: Response) {
    const students = await this.studentService.getAllStudents();
    res.json(students);
  }
}