import { DELETE, GET, POST, PUT, route, updateConfig } from "awilix-express";
import { Request, Response, Router } from "express";
import { IStudentService } from "../interfaces/IStudentService";
import { request } from "http";

@route('/students')
export class StudentController {

  public router: Router;

  constructor(private readonly studentService: IStudentService) {
    this.router = Router();
    this.router.get('/', this.all.bind(this));
    this.router.get('/:id', this.getById.bind(this));
    this.router.post('/', this.create.bind(this));
    this.router.put('/:id', this.updateConfig.bind(this));
    this.router.delete('/:id', this.delete.bind(this));
  }

  @GET()
  public async all(req: Request, res: Response) {
    const students = await this.studentService.getAllStudents();
    res.json(students);
  }

  @route('/:id')
  @GET()
  public async getById(req: Request, res: Response) {
   
    // const id: number = +req.params.id;
    const id: number = Number(req.params.id);
    const student = await this.studentService.getStudentById(id);
  
    if(student) {
      res.json(student);
    } else {
      res.status(404).send("Student not found");
    }

  }

  @route('/')
  @POST()
  public async create(req: Request, res: Response) {
    const newStudent = await this.studentService.createStudent(req.body);
    res.json(newStudent);
  }

  @route('/:id')
  @PUT()
  public async updateConfig(req: Request, res: Response) {
    await this.studentService.updateStudent(Number(req.params.id), req.body);
    res.status(200).send("Student updaed succesfully");
  }

  @route('/:id')
  @DELETE()
  public async delete(req: Request, res: Response) {
    await this.studentService.deleteStudent(+req.params.id);
    res.status(200).send("Student delete successfully");
  }

}