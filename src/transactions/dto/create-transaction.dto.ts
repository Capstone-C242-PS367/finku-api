export class CreateTransactionDto {
  user_id: string;
  name: string;
  date: Date;
  amount: string;
  type: string;
  category: string;
  currency: string;
}
