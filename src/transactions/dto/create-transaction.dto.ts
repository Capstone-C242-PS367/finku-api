import { Type } from 'class-transformer';
import { IsString, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionItemDto } from './transaction-item.dto';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty({ message: 'user_id is required' })
  @ApiProperty()
  user_id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TransactionItemDto)
  @ApiProperty({ type: [TransactionItemDto] })
  data: TransactionItemDto[];
}
