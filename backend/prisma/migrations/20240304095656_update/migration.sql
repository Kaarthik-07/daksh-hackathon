/*
  Warnings:

  - A unique constraint covering the columns `[phone_no]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_phone_no_key" ON "User"("phone_no");
