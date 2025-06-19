/*
  Warnings:

  - You are about to drop the column `email` on the `USER` table. All the data in the column will be lost.
  - You are about to drop the column `id_user_type` on the `USER` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `USER` table. All the data in the column will be lost.
  - You are about to drop the `USER_TYPE` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "USER" DROP CONSTRAINT "USER_id_user_type_fkey";

-- DropIndex
DROP INDEX "USER_email_key";

-- AlterTable
ALTER TABLE "USER" DROP COLUMN "email",
DROP COLUMN "id_user_type",
DROP COLUMN "password",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "USER_TYPE";

-- CreateTable
CREATE TABLE "ORGANIZATION" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ORGANIZATION_pkey" PRIMARY KEY ("id")
);
