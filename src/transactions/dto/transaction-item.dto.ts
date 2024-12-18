import {
  IsString,
  IsNotEmpty,
  IsNumberString,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TransactionItemDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsNumberString({}, { message: 'amount must be a numeric value' })
  @IsNotEmpty({ message: 'amount is required' })
  @ApiProperty()
  amount: string;

  @IsString()
  @IsNotEmpty({ message: 'type is required' })
  @ApiProperty()
  type: string;

  @IsDateString(
    {},
    { message: 'date must be a valid date in ISO format (YYYY-MM-DD)' },
  )
  @IsNotEmpty({ message: 'date is required' })
  @ApiProperty()
  date: string;

  @IsString()
  @ApiProperty()
  category: string;

  @IsString()
  @ApiProperty()
  currency: string;
}
