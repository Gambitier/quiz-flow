import { Roles } from '@modules/auth/guards/role-authz.guard';
import { AddNewCycleDomainModel } from '@modules/regional-question-cycle/models/domain';
import { AddNewCycleRequest } from '@modules/regional-question-cycle/models/request';
import { UserRoleDomain } from '@modules/user/models/domain';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RegionalQuestionCycleService } from './regional-question-cycle.service';

@ApiBearerAuth('authorization')
@ApiTags('regional-question-cycles')
@Controller('regional-question-cycles')
export class RegionalQuestionCycleController {
  constructor(private readonly cycleService: RegionalQuestionCycleService) {}

  @Post('add')
  @HttpCode(HttpStatus.CREATED)
  @Roles(UserRoleDomain.Admin)
  async addNewCycle(@Body() addNewCycleReq: AddNewCycleRequest): Promise<void> {
    const domain = new AddNewCycleDomainModel(addNewCycleReq);
    await this.cycleService.addNewCycle(domain);
  }
}
