import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() payload: { user_id: string; data: CreateTransactionDto[] }) {
    try {
      return this.transactionsService.create(payload);
    } catch (e) {
      throw new InternalServerErrorException(`Unexpected error: ${e.message}`);
    }
  }

  @Get()
  // @UseGuards(AuthGuard)
  findAll() {
    try {
      return this.transactionsService.findAll();
    } catch (e) {
      throw new InternalServerErrorException(`Unexpected error: ${e.message}`);
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    try {
      return this.transactionsService.findOne(id);
    } catch (e) {
      throw new InternalServerErrorException(`Unexpected error: ${e.message}`);
    }
  }

  @Get('user/:user_id')
  @UseGuards(AuthGuard)
  async findByUserId(@Param('user_id') user_id: string) {
    try {
      return await this.transactionsService.findByUserId(user_id);
    } catch (e) {
      throw new InternalServerErrorException(`Unexpected error: ${e.message}`);
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    try {
      return this.transactionsService.update(id, updateTransactionDto);
    } catch (e) {
      throw new InternalServerErrorException(`Unexpected error: ${e.message}`);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    try {
      return this.transactionsService.remove(id);
    } catch (e) {
      throw new InternalServerErrorException(`Unexpected error: ${e.message}`);
    }
  }
}
