/*
  Warnings:

  - You are about to drop the column `leaderBoardId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_leaderBoardId_fkey";

-- AlterTable
ALTER TABLE "LeaderBoard" ADD COLUMN     "topUsers" TEXT[];

-- AlterTable
ALTER TABLE "User" DROP COLUMN "leaderBoardId";
