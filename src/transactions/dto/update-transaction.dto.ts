import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsNumberString,
  IsDateString,
} from 'class-validator';

export class UpdateTransactionDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'name cannot be empty' })
  title?: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'date must be a valid date in ISO format (YYYY-MM-DD)' },
  )
  date?: Date;

  @IsOptional()
  @IsNumberString({}, { message: 'amount must be a numeric value' })
  @IsNotEmpty({ message: 'amount cannot be empty' })
  amount?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'currency cannot be empty' })
  currency?: string;
}
