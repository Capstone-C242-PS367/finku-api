import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  name?: string;
  date?: Date;
  amount?: string;
  type?: string;
  category?: string;
  currency?: string;
}
