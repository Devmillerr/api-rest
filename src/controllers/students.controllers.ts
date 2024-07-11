import { Response, Request } from "express";
import { PrismaClient } from '@prisma/client';
import { StudentServices } from '../services/database/students.services';

const prisma = new PrismaClient();
const studentServices = new StudentServices();

export class StudentController {
    async getAll(req: Request, res: Response) {
        const students = await studentServices.getAll();
        res.json({
            data: students,
        });
    }

    async getOne(req: Request, res: Response) {
        const student = await studentServices.getOne({
            id: req.params.id,
        });
        res.json({
            data: student,
        });
    }

    async create(req: Request, res: Response) {
        const newStudent = await studentServices.create({
            email: req.body.email,
            password: req.body.password,
        });
        res.json({
            data: newStudent,
        });
    }

    async update(req: Request, res: Response) {
        let body = req.body
        let id = req.params.id
        const updateStudent = await studentServices.update({ id }, body)
        res.json({
          data: updateStudent,
        })
      }

      async updateDetails(req: Request, res: Response) {
        const studentId = req.params.id;
        const getStudent = await studentServices.getOne({ id: studentId });
    
        if (getStudent && getStudent.studentdetailsId) {
            const dataStudentDetails = await studentServices.updateDetails(
                { id: getStudent.studentdetailsId },
                req.body
            );
    
            res.json({
                data: dataStudentDetails,
            });
        } else {
            const dataStudentDetails = await studentServices.createDetails(req.body);
    
            await studentServices.update(
                { id: getStudent?.id },
                {
                    studentdetails: {
                        connect: { id: dataStudentDetails.id },
                    },
                }
            );
    
            res.json({
                data: dataStudentDetails,
            });
        }
    }

    async remove(req: Request, res: Response) {
        const removeStudent = await studentServices.remove({
          id: req.params.id,
        })
        res.json({
          data: removeStudent,
        })
      }
    
}
