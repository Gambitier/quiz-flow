/*
  Warnings:

  - You are about to drop the column `scheduledEndAt` on the `QuestionAssignment` table. All the data in the column will be lost.
  - You are about to drop the column `scheduledStartAt` on the `QuestionAssignment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QuestionAssignment" DROP COLUMN "scheduledEndAt",
DROP COLUMN "scheduledStartAt";

-- CreateTable
CREATE TABLE "RegionalQuestionCycle" (
    "id" UUID NOT NULL,
    "questionAssignmentId" UUID NOT NULL,
    "regionId" UUID NOT NULL,
    "iteration" INTEGER NOT NULL,
    "cycleStart" TIMESTAMP(3) NOT NULL,
    "cycleEnd" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RegionalQuestionCycle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RegionalQuestionCycle_questionAssignmentId_key" ON "RegionalQuestionCycle"("questionAssignmentId");

-- CreateIndex
CREATE UNIQUE INDEX "RegionalQuestionCycle_questionAssignmentId_iteration_key" ON "RegionalQuestionCycle"("questionAssignmentId", "iteration");

-- AddForeignKey
ALTER TABLE "RegionalQuestionCycle" ADD CONSTRAINT "RegionalQuestionCycle_questionAssignmentId_fkey" FOREIGN KEY ("questionAssignmentId") REFERENCES "QuestionAssignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegionalQuestionCycle" ADD CONSTRAINT "RegionalQuestionCycle_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
