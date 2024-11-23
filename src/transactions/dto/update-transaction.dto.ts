import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsNumberString,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTransactionDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'name cannot be empty' })
  @ApiProperty()
  title?: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'date must be a valid date in ISO format (YYYY-MM-DD)' },
  )
  @ApiProperty()
  date?: Date;

  @IsOptional()
  @IsNumberString({}, { message: 'amount must be a numeric value' })
  @IsNotEmpty({ message: 'amount cannot be empty' })
  @ApiProperty()
  amount?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  type?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  category?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'currency cannot be empty' })
  @ApiProperty()
  currency?: string;
}
