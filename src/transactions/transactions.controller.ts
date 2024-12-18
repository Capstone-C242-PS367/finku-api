import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 201,
    description: 'Transactions created successfully.',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'success',
        },
        message: {
          type: 'string',
          example: 'Transactions created successfully',
        },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              transaction_id: {
                type: 'string',
                format: 'uuid',
                example: '123e4567-e89b-12d3-a456-426614174000',
              },
              title: {
                type: 'string',
                example: 'pecel lele',
              },
              amount: {
                type: 'string',
                example: '30000',
              },
              type: {
                type: 'string',
                example: 'debt',
              },
              date: {
                type: 'string',
                format: 'date',
                example: '2024-11-17',
              },
              category: {
                type: 'string',
                example: 'food',
              },
              currency: {
                type: 'string',
                example: 'IDR',
              },
              user_id: {
                type: 'string',
                format: 'uuid',
                example: '456e1234-e89b-12d3-a456-426614174000',
              },
              created_at: {
                type: 'string',
                format: 'date-time',
                example: '2024-11-17T12:00:00Z',
              },
              updated_at: {
                type: 'string',
                format: 'date-time',
                example: '2024-11-17T13:00:00Z',
              },
            },
          },
        },
      },
    },
  })
  @ApiBearerAuth()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    try {
      return this.transactionsService.create(createTransactionDto);
    } catch (e) {
      throw new InternalServerErrorException(`Unexpected error: ${e.message}`);
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'All transactions fetched successfully.',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'success',
        },
        message: {
          type: 'string',
          example: 'All transactions fetched successfully',
        },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              transaction_id: {
                type: 'string',
                format: 'uuid',
                example: '123e4567-e89b-12d3-a456-426614174000',
              },
              title: {
                type: 'string',
                example: 'pecel ayam',
              },
              amount: {
                type: 'string',
                example: '50000',
              },
              type: {
                type: 'string',
                example: 'credit',
              },
              date: {
                type: 'string',
                format: 'date',
                example: '2024-11-17',
              },
              category: {
                type: 'string',
                example: 'food',
              },
              currency: {
                type: 'string',
                example: 'IDR',
              },
              user_id: {
                type: 'string',
                format: 'uuid',
                example: '456e1234-e89b-12d3-a456-426614174000',
              },
              created_at: {
                type: 'string',
                format: 'date-time',
                example: '2024-11-17T12:00:00Z',
              },
              updated_at: {
                type: 'string',
                format: 'date-time',
                example: '2024-11-17T13:00:00Z',
              },
            },
          },
        },
      },
    },
  })
  @ApiBearerAuth()
  findAll() {
    try {
      return this.transactionsService.findAll();
    } catch (e) {
      throw new InternalServerErrorException(`Unexpected error: ${e.message}`);
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Transaction fetched successfully.',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'success',
        },
        message: {
          type: 'string',
          example: 'Transaction fetched successfully',
        },
        data: {
          type: 'object',
          properties: {
            transaction_id: {
              type: 'string',
              format: 'uuid',
              example: '123e4567-e89b-12d3-a456-426614174000',
            },
            title: {
              type: 'string',
              example: 'pecel ayam',
            },
            amount: {
              type: 'string',
              example: '50000',
            },
            type: {
              type: 'string',
              example: 'credit',
            },
            date: {
              type: 'string',
              format: 'date',
              example: '2024-11-17',
            },
            category: {
              type: 'string',
              example: 'food',
            },
            currency: {
              type: 'string',
              example: 'IDR',
            },
            user_id: {
              type: 'string',
              format: 'uuid',
              example: '456e1234-e89b-12d3-a456-426614174000',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              example: '2024-11-17T12:00:00Z',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              example: '2024-11-17T13:00:00Z',
            },
          },
        },
      },
    },
  })
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    try {
      return this.transactionsService.findOne(id);
    } catch (e) {
      throw new InternalServerErrorException(`Unexpected error: ${e.message}`);
    }
  }
  @Get('user/:user_id')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Transactions for the specified user fetched successfully.',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'success',
        },
        message: {
          type: 'string',
          example: 'Transactions for user fetched successfully',
        },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              transaction_id: {
                type: 'string',
                format: 'uuid',
                example: '123e4567-e89b-12d3-a456-426614174000',
              },
              title: {
                type: 'string',
                example: 'pecel ayam',
              },
              amount: {
                type: 'string',
                example: '50000',
              },
              type: {
                type: 'string',
                example: 'credit',
              },
              date: {
                type: 'string',
                format: 'date',
                example: '2024-11-17',
              },
              category: {
                type: 'string',
                example: 'food',
              },
              currency: {
                type: 'string',
                example: 'IDR',
              },
              user_id: {
                type: 'string',
                format: 'uuid',
                example: '456e1234-e89b-12d3-a456-426614174000',
              },
              created_at: {
                type: 'string',
                format: 'date-time',
                example: '2024-11-17T12:00:00Z',
              },
              updated_at: {
                type: 'string',
                format: 'date-time',
                example: '2024-11-17T13:00:00Z',
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'No transactions found for the specified user ID.',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: 404,
        },
        message: {
          type: 'string',
          example:
            'No transactions found for user ID 456e1234-e89b-12d3-a456-426614174000',
        },
        error: {
          type: 'string',
          example: 'Not Found',
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: 500,
        },
        message: {
          type: 'string',
          example: 'Unexpected error: Something went wrong',
        },
        error: {
          type: 'string',
          example: 'Internal Server Error',
        },
      },
    },
  })
  @ApiBearerAuth()
  findByUserId(@Param('user_id') user_id: string) {
    try {
      return this.transactionsService.findByUserId(user_id);
    } catch (e) {
      throw new InternalServerErrorException(`Unexpected error: ${e.message}`);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Transaction deleted successfully.',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'success',
        },
        message: {
          type: 'string',
          example: 'Transaction with ID #xxxxxx removed successfully',
        },
      },
    },
  })
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    try {
      return this.transactionsService.remove(id);
    } catch (e) {
      throw new InternalServerErrorException(`Unexpected error: ${e.message}`);
    }
  }
}
