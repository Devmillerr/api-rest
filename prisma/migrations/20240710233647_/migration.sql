/*
  Warnings:

  - You are about to drop the column `descripction` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `students` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentdetailsId]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "courses" DROP COLUMN "descripction",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "age",
DROP COLUMN "name",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "studentdetailsId" TEXT;

-- CreateTable
CREATE TABLE "studentDetails" (
    "id" TEXT NOT NULL,
    "names" TEXT NOT NULL,
    "surnames" TEXT NOT NULL,
    "age" TEXT NOT NULL,

    CONSTRAINT "studentDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_studentdetailsId_key" ON "students"("studentdetailsId");

-- CreateIndex
CREATE INDEX "students_email_idx" ON "students"("email");

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_studentdetailsId_fkey" FOREIGN KEY ("studentdetailsId") REFERENCES "studentDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;
