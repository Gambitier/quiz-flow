import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function seedQuestionAssignments() {
  const seedDataPath = path.join(__dirname, 'questionAssignment.json');
  console.log(`seeding from ${seedDataPath}`);

  const questionAssignments = JSON.parse(
    fs.readFileSync(seedDataPath, 'utf-8'),
  );

  await prisma.questionAssignment.createMany({
    data: questionAssignments,
    skipDuplicates: true,
  });

  console.log('Question assignments seeded successfully.');
}

seedQuestionAssignments()
  .catch((error) => {
    console.error('Error seeding question assignments:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
