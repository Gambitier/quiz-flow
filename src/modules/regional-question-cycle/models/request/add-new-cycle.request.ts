import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AddNewCycleRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  regionId: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  cycleStart: Date;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  cycleEnd: Date;
}
