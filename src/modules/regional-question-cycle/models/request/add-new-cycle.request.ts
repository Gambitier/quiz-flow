import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class AddNewCycleRequest {
  @IsString()
  @IsNotEmpty()
  regionId: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  cycleStart: Date;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  cycleEnd: Date;
}
