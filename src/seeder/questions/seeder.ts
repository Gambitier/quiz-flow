import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const seedDataPath = path.join(__dirname, 'questions.json');
  console.log(`seeding from ${seedDataPath}`);
  const content = fs.readFileSync(seedDataPath, 'utf-8');
  const regionsData = JSON.parse(content);

  await prisma.question.createMany({
    data: regionsData,
    skipDuplicates: true,
  });

  console.log('Questions seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
