import { db } from '../db';
import { students, Prisma } from '@prisma/client';

export class StudentServices {
  async create(data: Prisma.studentsCreateInput): Promise<students> {
    return await db.students.create({
      data,
    });
  }

  async getAll(where?: Prisma.studentsWhereInput): Promise<students[]> {
    return db.students.findMany({
      where,
    });
  }

  async getOne(where: Prisma.studentsWhereUniqueInput): Promise<students | null> {
    return db.students.findUnique({
      where,
    });
  }

  async update(where: Prisma.studentsWhereUniqueInput, data: Prisma.studentsUpdateInput) {
    return db.students.update({
      where,
      data,
    });
  }

  createDetails(data: Prisma.studentDetailsCreateInput) {
    return db.studentDetails.create({
      data,
    })
  }

  OneDetails(where: Prisma.studentDetailsWhereInput) {
    return db.studentDetails.findFirst({
      where,
    })
  }

  updateDetails(
    where: Prisma.studentDetailsWhereUniqueInput,
    data: Prisma.studentDetailsUpdateInput
  ) {
    return db.studentDetails.update({
      where,
      data,
    })
  }

  async remove(where: Prisma.studentsWhereUniqueInput) {
    return db.students.delete({
      where,
    });
  }
}
