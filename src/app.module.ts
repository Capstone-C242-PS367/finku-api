import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { MlOcrModule } from './ml-ocr/ml-ocr.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, TransactionsModule, MlOcrModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
