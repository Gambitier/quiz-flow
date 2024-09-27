/*
  Warnings:

  - A unique constraint covering the columns `[regionId,iteration]` on the table `RegionalQuestionCycle` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "RegionalQuestionCycle_questionAssignmentId_iteration_key";

-- CreateIndex
CREATE UNIQUE INDEX "RegionalQuestionCycle_regionId_iteration_key" ON "RegionalQuestionCycle"("regionId", "iteration");
