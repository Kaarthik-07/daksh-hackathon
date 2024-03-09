/*
  Warnings:

  - Changed the type of `questions` on the `Quiz` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "questions",
ADD COLUMN     "questions" JSONB NOT NULL;
