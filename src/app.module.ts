import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { MlOcrModule } from './ml-ocr/ml-ocr.module';

@Module({
  imports: [UsersModule, TransactionsModule, MlOcrModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
