import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Firestore } from '@google-cloud/firestore';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from '../users/users.service';

@Injectable()
export class TransactionsService {
  private collection = new Firestore().collection('transactions');
  constructor(private readonly usersService: UsersService) {}
  async create(createTransactionDto: CreateTransactionDto) {
    const user = await this.usersService.findOne(createTransactionDto.user_id);
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createTransactionDto.user_id} not found`,
      );
    }

    const transactionId = uuidv4();
    const newTransaction = {
      ...createTransactionDto,
      transaction_id: transactionId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    try {
      await this.collection.doc(transactionId).set(newTransaction);
      return {
        status: 'success',
        message: 'Transaction created successfully',
        data: newTransaction,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to create transaction: ${error.message}`,
      );
    }
  }

  async findAll() {
    try {
      const snapshot = await this.collection.get();
      const transactions = snapshot.docs.map((doc) => doc.data());
      return {
        status: 'success',
        message: 'Transactions fetched successfully',
        data: transactions,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to fetch transactions: ${error.message}`,
      );
    }
  }

  async findOne(id: string) {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return {
      status: 'success',
      message: 'Transaction fetched successfully',
      data: doc.data(),
    };
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const transactionRef = this.collection.doc(id);
    const doc = await transactionRef.get();

    if (!doc.exists) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    const updatedTransaction = {
      ...updateTransactionDto,
      updatedAt: new Date().toISOString(),
    };

    try {
      await transactionRef.update(updatedTransaction);
      return {
        status: 'success',
        message: `Transaction with ID ${id} updated successfully`,
        data: updatedTransaction,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update transaction: ${error.message}`,
      );
    }
  }

  async remove(id: string) {
    const transactionRef = this.collection.doc(id);
    const doc = await transactionRef.get();

    if (!doc.exists) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    try {
      await transactionRef.delete();
      return {
        status: 'success',
        message: `Transaction with ID ${id} deleted successfully`,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete transaction: ${error.message}`,
      );
    }
  }
}
