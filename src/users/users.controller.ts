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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'User created successfully.',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'success',
        },
        message: {
          type: 'string',
          example: 'User created successfully',
        },
        data: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              example: '123e4567-e89b-12d3-a456-426614174000',
            },
            name: {
              type: 'string',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'johndoe@example.com',
            },
          },
        },
      },
    },
  })
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.usersService.create(createUserDto);
    } catch (e) {
      throw new InternalServerErrorException(`Unexpected error: ${e.message}`);
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'All users fetched successfully.',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'success',
        },
        message: {
          type: 'string',
          example: 'All users fetched successfully',
        },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                format: 'uuid',
                example: '123e4567-e89b-12d3-a456-426614174000',
              },
              name: {
                type: 'string',
                example: 'John Doe',
              },
              email: {
                type: 'string',
                format: 'email',
                example: 'johndoe@example.com',
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
      return this.usersService.findAll();
    } catch (e) {
      throw new InternalServerErrorException(`Unexpected error: ${e.message}`);
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'User fetched successfully.',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'success',
        },
        message: {
          type: 'string',
          example: 'User fetched successfully',
        },
        data: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              example: '123e4567-e89b-12d3-a456-426614174000',
            },
            name: {
              type: 'string',
              example: 'user_name',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'user@example.com',
            },
            password: {
              type: 'string',
              example: 'hash_password_user',
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
      return this.usersService.findOne(id);
    } catch (e) {
      throw new InternalServerErrorException(`Unexpected error: ${e.message}`);
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'User with ID #xxxx updated successfully',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'success',
        },
        message: {
          type: 'string',
          example: 'User with ID #xxxx updated successfully',
        },
        data: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'user_name',
            },
            password: {
              type: 'string',
              example: 'password_user_hash',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              example: '2024-11-17T12:00:00Z',
            },
          },
        },
      },
    },
  })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.usersService.update(id, updateUserDto);
    } catch (e) {
      throw new InternalServerErrorException(`Unexpected error: ${e.message}`);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'User removed successfully.',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'success',
        },
        message: {
          type: 'string',
          example: 'User with ID #xxxxxx removed successfully',
        },
      },
    },
  })
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    try {
      return this.usersService.remove(id);
    } catch (e) {
      throw new InternalServerErrorException(`Unexpected error: ${e.message}`);
    }
  }
}
