/*
  Warnings:

  - You are about to drop the column `description` on the `Report` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Report" DROP COLUMN "description",
ADD COLUMN     "content" TEXT;
