import {
  IsString,
  IsNotEmpty,
  IsNumberString,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty({ message: 'name is required' })
  @ApiProperty()
  title: string;

  @IsDateString(
    {},
    { message: 'date must be a valid date in ISO format (YYYY-MM-DD)' },
  )
  date: Date;

  @IsNumberString({}, { message: 'amount must be a numeric value' })
  @IsNotEmpty({ message: 'amount is required' })
  @ApiProperty()
  amount: string;

  @IsString()
  type: string;

  @IsString()
  @ApiProperty()
  category: string;

  @IsString()
  @IsNotEmpty({ message: 'currency is required' })
  @ApiProperty()
  currency: string;
}
