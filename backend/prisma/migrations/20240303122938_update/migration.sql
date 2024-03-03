/*
  Warnings:

  - The `points` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `rank` to the `LeaderBoard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekNumber` to the `LeaderBoard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LeaderBoard" ADD COLUMN     "rank" TEXT NOT NULL,
ADD COLUMN     "weekNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Module" ADD COLUMN     "earned_points" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_points" INTEGER NOT NULL DEFAULT 100,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Module_id_seq";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "leaderBoardId" INTEGER,
DROP COLUMN "points",
ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "ModuleProgress" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "moduleId" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "SubmoduleProgress" (
    "id" SERIAL NOT NULL,
    "moduleProgressId" INTEGER NOT NULL,
    "submoduleId" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "WeeklyScore" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "WeeklyScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ModuleProgress_id_key" ON "ModuleProgress"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ModuleProgress_userId_key" ON "ModuleProgress"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SubmoduleProgress_id_key" ON "SubmoduleProgress"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WeeklyScore_id_key" ON "WeeklyScore"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WeeklyScore_userId_key" ON "WeeklyScore"("userId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_leaderBoardId_fkey" FOREIGN KEY ("leaderBoardId") REFERENCES "LeaderBoard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleProgress" ADD CONSTRAINT "ModuleProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleProgress" ADD CONSTRAINT "ModuleProgress_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmoduleProgress" ADD CONSTRAINT "SubmoduleProgress_moduleProgressId_fkey" FOREIGN KEY ("moduleProgressId") REFERENCES "ModuleProgress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmoduleProgress" ADD CONSTRAINT "SubmoduleProgress_submoduleId_fkey" FOREIGN KEY ("submoduleId") REFERENCES "Submodule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyScore" ADD CONSTRAINT "WeeklyScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
