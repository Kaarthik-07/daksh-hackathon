-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "phone_no" TEXT NOT NULL,
    "points" TEXT NOT NULL DEFAULT '0',
    "rank" TEXT NOT NULL DEFAULT 'rookie',
    "avatar" TEXT NOT NULL DEFAULT 'https://image.png',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "PasswordReset" (
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Module" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Submodule" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "animations" TEXT[],
    "moduleID" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,
    "submoduleID" INTEGER NOT NULL,
    "questions" TEXT[]
);

-- CreateTable
CREATE TABLE "LeaderBoard" (
    "id" SERIAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordReset_userId_key" ON "PasswordReset"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Module_id_key" ON "Module"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Submodule_id_key" ON "Submodule"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Submodule_moduleID_key" ON "Submodule"("moduleID");

-- CreateIndex
CREATE UNIQUE INDEX "Quiz_id_key" ON "Quiz"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Quiz_submoduleID_key" ON "Quiz"("submoduleID");

-- CreateIndex
CREATE UNIQUE INDEX "LeaderBoard_id_key" ON "LeaderBoard"("id");

-- AddForeignKey
ALTER TABLE "Submodule" ADD CONSTRAINT "Submodule_moduleID_fkey" FOREIGN KEY ("moduleID") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_submoduleID_fkey" FOREIGN KEY ("submoduleID") REFERENCES "Submodule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
