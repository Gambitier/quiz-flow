import { AppModule } from '@app/app.module';
import { AddNewCycleDomainModel } from '@modules/regional-question-cycle/models/domain';
import { RegionalQuestionCycleService } from '@modules/regional-question-cycle/regional-question-cycle.service';
import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(RegionalQuestionCycleService);

  const seedDataPath = path.join(__dirname, 'cycles.json');
  console.log(`seeding from ${seedDataPath}`);
  const content = fs.readFileSync(seedDataPath, 'utf-8');
  const data = JSON.parse(content) as AddNewCycleDomainModel[];

  for (const cycle of data) {
    try {
      const randomNum = Math.floor(Math.random() * 7) + 2; // 2 to 8

      const cycleStart = new Date();
      const cycleEnd = new Date(cycleStart);
      cycleEnd.setMinutes(cycleEnd.getMinutes() + randomNum);

      await service.addNewCycle({
        ...cycle,
        cycleStart: cycleStart,
        cycleEnd: cycleEnd,
      });

      console.log(
        `cycle created with ID: ${cycle.id} for regionId: ${cycle.regionId}`,
      );
    } catch (error) {
      console.error(
        `error creating cycle with ID: ${cycle.id} for regionId: ${cycle.regionId}: `,
        error,
      );
    }
  }
  await app.close();
}

main();
