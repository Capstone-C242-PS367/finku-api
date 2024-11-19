import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsNumberString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty({ message: 'user_id is required' })
  user_id: string;

  @IsString()
  @IsNotEmpty({ message: 'name is required' })
  @Length(1, 255, { message: 'name must be between 1 and 255 characters' })
  @ApiProperty()
  name: string;

  @IsDateString(
    {},
    { message: 'date must be a valid date in ISO format (YYYY-MM-DD)' },
  )
  date: Date;
  @IsNumberString({}, { message: 'amount must be a numeric value' })
  @IsNotEmpty({ message: 'amount is required' })
  @ApiProperty()
  amount: string;

  type: string;

  @IsString()
  @Length(1, 20, { message: 'category must be between 1 and 20 characters' })
  @ApiProperty()
  category: string;

  @IsString()
  @IsNotEmpty({ message: 'currency is required' })
  @Length(3, 10, { message: 'currency must be between 3 and 10 characters' })
  @ApiProperty()
  currency: string;
}
