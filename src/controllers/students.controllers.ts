import { Response, Request, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { StudentServices } from '../services/database/students.services';
import boom from '@hapi/boom'

const studentServices = new StudentServices();

const prisma = new PrismaClient();

export class StudentController {
    async getAll(req: Request, res: Response) {
        const students = await studentServices.getAll({
            studentdetailsId:  req.params.id,
        });
        res.json({
            data: students,
        });
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        const student = await studentServices.getOne({
            id: req.params.id,
        });

        if (!student) return next(boom.notFound())

        res.json({
            data: student,
        });
    }

    async createStudent(req: Request, res: Response) {
        const newUser = await studentServices.create({
          email: req.body.email,
          password: req.body.password,
        });
        res.json({
          data: newUser,
        });
      }
    
    

    async create(req: Request, res: Response) {
    
        const { email, password, courseId } = req.body;
        if (!courseId) {
          return res.status(400).json({ error: 'Course ID is required' });
        }
    
        const newStudent = await studentServices.createStudentWithCourse(
          { email, password }, 
          courseId
        );
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

      async updateDetails(req: Request, res: Response, next: NextFunction) {
        const studentId = req.params.id;
        const getStudent = await studentServices.getOne({ id: studentId });
    
        if (!getStudent) return next(boom.notFound('User not found'))

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

    async updateCourse(req: Request, res: Response, next: NextFunction) {
        const studentId = req.params.id;
        const courseId = req.body.courseId; // Asegúrate de enviar el ID del curso en el cuerpo de la solicitud
      
        // Obtener el estudiante
        const getStudent = await studentServices.getOne({ id: studentId });
      
        if (!getStudent) {
          return next(boom.notFound('Student not found'));
        }
      
        // Verificar si el estudiante ya está asociado con un curso
        if (getStudent.courseId) {
          // El estudiante ya tiene un curso asociado, actualizar la asociación
          const updatedStudent = await studentServices.updateStudentCourse(studentId, courseId);
          
          res.json({
            data: updatedStudent,
          });
        } else {
          // El estudiante no tiene un curso asociado, asociar el curso
          const updatedStudent = await studentServices.updateStudentCourse(studentId, courseId);
          
          res.json({
            data: updatedStudent,
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
