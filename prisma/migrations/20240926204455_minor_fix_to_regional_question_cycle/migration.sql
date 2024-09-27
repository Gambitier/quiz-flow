-- DropForeignKey
ALTER TABLE "RegionalQuestionCycle" DROP CONSTRAINT "RegionalQuestionCycle_questionAssignmentId_fkey";

-- AlterTable
ALTER TABLE "RegionalQuestionCycle" ALTER COLUMN "questionAssignmentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "RegionalQuestionCycle" ADD CONSTRAINT "RegionalQuestionCycle_questionAssignmentId_fkey" FOREIGN KEY ("questionAssignmentId") REFERENCES "QuestionAssignment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
