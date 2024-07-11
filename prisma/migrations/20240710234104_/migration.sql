/*
  Warnings:

  - Added the required column `updatedAT` to the `studentDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "studentDetails" ADD COLUMN     "updatedAT" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
