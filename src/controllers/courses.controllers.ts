import { Response, Request } from "express";
import { PrismaClient } from '@prisma/client';
import { CourseServices } from '../services/database/courses.services';


const courseServices = new CourseServices()

const prisma = new PrismaClient()

export class CourseController {
    async getAll(req: Request, res: Response) {
        const courses = await courseServices.getAll({
            id: req.params.id
        })
        res.json({
            courses,
        })
    }

    async getOne(req: Request, res: Response) {
        const course =await courseServices.getOne({
            id: req.params.id,
        })
        res.json({
            course,
        })
    }

    async create(req: Request, res: Response) {
        const newCourse = await courseServices.create(req.body)
        res.json({
            data: newCourse,
        })
    }

    async update(req: Request, res: Response) {
        const updateCourse = await courseServices.update(req.body, {
            id: req.params.id,
        })
        res.json({
            data: updateCourse,
        })
    }

    async remove(req: Request, res: Response) {
        const removeCourse = await courseServices.remove({
            id: req.params.id,
        })
        res.json({
            data: removeCourse,
        })
    }
}