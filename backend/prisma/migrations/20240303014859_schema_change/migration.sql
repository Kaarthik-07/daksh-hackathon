/*
  Warnings:

  - You are about to drop the column `userId` on the `PasswordReset` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `PasswordReset` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `PasswordReset` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PasswordReset_userId_key";

-- AlterTable
ALTER TABLE "PasswordReset" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PasswordReset_email_key" ON "PasswordReset"("email");
