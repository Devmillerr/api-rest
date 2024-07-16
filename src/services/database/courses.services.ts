import { db } from "../db";
import { courses, Prisma } from "@prisma/client";

export class CourseServices {
    create(data: Prisma.coursesCreateInput): Promise<courses> {
        return db.courses.create({
            data,
        })
    }

    getAll(where?: Prisma.coursesWhereInput): Promise<courses[]> {
        return db.courses.findMany({
            where,
        })
    }

    getOne(where: Prisma.coursesWhereUniqueInput) {
        return db.courses.findUnique({
            where,
        })
    }

    update(where: Prisma.coursesWhereUniqueInput, data: Prisma.coursesUpdateInput) {
        return db.courses.update({where, data})
    }

    remove(where: Prisma.coursesWhereUniqueInput) {
        return db.courses.delete({
            where,
        })
    }
}