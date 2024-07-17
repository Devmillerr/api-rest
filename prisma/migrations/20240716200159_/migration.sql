/*
  Warnings:

  - You are about to drop the column `names` on the `studentDetails` table. All the data in the column will be lost.
  - You are about to drop the column `surnames` on the `studentDetails` table. All the data in the column will be lost.
  - The `age` column on the `studentDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `firstname` to the `studentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `studentDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "studentDetails" DROP COLUMN "names",
DROP COLUMN "surnames",
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
DROP COLUMN "age",
ADD COLUMN     "age" INTEGER;
