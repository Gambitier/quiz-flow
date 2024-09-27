import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const seedDataPath = path.join(__dirname, 'cycles.json');
  console.log(`seeding from ${seedDataPath}`);
  const content = fs.readFileSync(seedDataPath, 'utf-8');
  const data = JSON.parse(content);

  for (const cycle of data) {
    try {
      await prisma.regionalQuestionCycle.upsert({
        where: { id: cycle.id },
        update: {
          cycleStart: new Date(cycle.cycleStart),
          cycleEnd: new Date(cycle.cycleEnd),
          iteration: cycle.iteration,
          regionId: cycle.regionId,
        },
        create: {
          id: cycle.id,
          regionId: cycle.regionId,
          cycleStart: new Date(cycle.cycleStart),
          cycleEnd: new Date(cycle.cycleEnd),
          iteration: cycle.iteration,
        },
      });

      console.log(
        `Cycle for region ${cycle.regionId} (ID: ${cycle.id}) upserted successfully.`,
      );
    } catch (error) {
      console.error(
        `Error upserting cycle for region ${cycle.regionId} (ID: ${cycle.id}):`,
        error,
      );
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
