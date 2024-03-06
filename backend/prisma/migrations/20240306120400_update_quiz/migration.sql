/*
  Warnings:

  - Added the required column `earned_points` to the `ModuleProgress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_points` to the `ModuleProgress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moduleID` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `earned_points` to the `SubmoduleProgress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_points` to the `SubmoduleProgress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ModuleProgress" ADD COLUMN     "earned_points" INTEGER NOT NULL,
ADD COLUMN     "total_points" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "moduleID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SubmoduleProgress" ADD COLUMN     "earned_points" INTEGER NOT NULL,
ADD COLUMN     "total_points" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_moduleID_fkey" FOREIGN KEY ("moduleID") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
