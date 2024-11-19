import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  date?: Date;

  @ApiProperty()
  amount?: string;

  @ApiProperty()
  type?: string;

  @ApiProperty()
  category?: string;

  @ApiProperty()
  currency?: string;
}
