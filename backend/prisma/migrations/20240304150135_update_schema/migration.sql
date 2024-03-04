/*
  Warnings:

  - Added the required column `content` to the `Module` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Submodule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Module" ADD COLUMN     "content" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Submodule" ADD COLUMN     "content" JSONB NOT NULL;
