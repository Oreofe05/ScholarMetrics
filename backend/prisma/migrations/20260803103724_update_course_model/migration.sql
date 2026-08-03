/*
  Warnings:

  - Added the required column `level` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `units` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "lecturer" TEXT,
ADD COLUMN     "level" TEXT NOT NULL,
ADD COLUMN     "semester" TEXT NOT NULL,
ADD COLUMN     "units" INTEGER NOT NULL;
