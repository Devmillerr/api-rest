import { db } from '../db';
import { students, Prisma } from '@prisma/client';

export class StudentServices {
  create(data: Prisma.studentsCreateInput): Promise<students> {
    return db.students.create({
      data,
    });
  }

  getAll(where?: Prisma.studentsWhereInput): Promise<students[]> {
    return db.students.findMany({
      where,
    });
  }

  getOne(where: Prisma.studentsWhereUniqueInput) {
    return db.students.findUnique({
      where,
      include: {
        studentdetails: true,
        course: true,
      },
    })
  }

   update(where: Prisma.studentsWhereUniqueInput, data: Prisma.studentsUpdateInput) {
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

 remove(where: Prisma.studentsWhereUniqueInput) {
    return db.students.delete({
      where,
    });
  }

//NOTE Crear estudiante con curso asociado
createStudentWithCourse(studentData: Prisma.studentsCreateInput, courseId: string): Promise<students> {
  return db.students.create({
    data: {
      ...studentData,
      course: {
        connect: {
          id: courseId,
        },
      },
    },
  });
}

//NOTE función: Actualizar estudiante para asociar curso
updateStudentCourse(studentId: string, courseId: string): Promise<students> {
  return db.students.update({
    where: { id: studentId },
    data: {
      course: {
        connect: {
          id: courseId,
        },
      },
    },
  });
}
}
