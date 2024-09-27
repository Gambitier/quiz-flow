import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { BullBoardModule } from '@bull-board/nestjs';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { CycleQueue } from '@modules/regional-question-cycle/constants';
import { CycleProcessor } from '@modules/regional-question-cycle/queue-processors/cycle.processor';
import { RegionalQuestionCycleController } from '@modules/regional-question-cycle/regional-question-cycle.controller';
import { RegionalQuestionCycleService } from '@modules/regional-question-cycle/regional-question-cycle.service';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('redis.host'),
          port: configService.get<number>('redis.port'),
          password: configService.get<string>('redis.password'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: CycleQueue,
    }),
    BullBoardModule.forFeature({
      name: CycleQueue,
      adapter: BullMQAdapter,
    }),
  ],
  controllers: [RegionalQuestionCycleController],
  providers: [RegionalQuestionCycleService, CycleProcessor],
})
export class RegionalQuestionCycleModule {}
