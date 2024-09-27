/*
  Warnings:

  - You are about to drop the column `iteration` on the `RegionalQuestionCycle` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "RegionalQuestionCycle_regionId_iteration_key";

-- AlterTable
ALTER TABLE "RegionalQuestionCycle" DROP COLUMN "iteration";
