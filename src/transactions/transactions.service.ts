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
  private collection;
  constructor(private readonly usersService: UsersService) {
    try {
      const firestore = new Firestore({
        projectId: 'finku-app',
      });
      this.collection = firestore.collection('transactions');
    } catch (error) {
      console.error('Failed to initialize Firestore client:', error.message);
    }
  }
  async create(payload: { user_id: string; data: CreateTransactionDto[] }) {
    const { user_id, data } = payload;

    const user = await this.usersService.findOne(user_id);
    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }

    const transactions = data.map((transaction) => {
      const transactionId = uuidv4();
      return {
        ...transaction,
        transaction_id: transactionId,
        user_id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    });

    try {
      const batch = new Firestore().batch();
      transactions.forEach((transaction) => {
        const docRef = this.collection.doc(transaction.transaction_id);
        batch.set(docRef, transaction);
      });
      await batch.commit();

      return {
        status: 'success',
        message: 'Transactions created successfully',
        data: transactions,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to create transactions: ${error.message}`,
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

  async findByUserId(user_id: string) {
    try {
      const snapshot = await this.collection
        .where('user_id', '==', user_id)
        .get();

      if (snapshot.empty) {
        throw new NotFoundException(
          `No transactions found for user ID ${user_id}`,
        );
      }

      const transactions = snapshot.docs.map((doc) => doc.data());

      return {
        status: 'success',
        message: `Transactions for user ID ${user_id} fetched successfully`,
        data: transactions,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to fetch transactions: ${error.message}`,
      );
    }
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
