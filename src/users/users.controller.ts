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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.usersService.create(createUserDto);
    } catch (e) {
      throw new InternalServerErrorException(`Unexpected error: ${e.message}`);
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    try {
      return this.usersService.findAll();
    } catch (e) {
      throw new InternalServerErrorException(`Unexpected error: ${e.message}`);
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    try {
      return this.usersService.findOne(id);
    } catch (e) {
      throw new InternalServerErrorException(`Unexpected error: ${e.message}`);
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.usersService.update(id, updateUserDto);
    } catch (e) {
      throw new InternalServerErrorException(`Unexpected error: ${e.message}`);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    try {
      return this.usersService.remove(id);
    } catch (e) {
      throw new InternalServerErrorException(`Unexpected error: ${e.message}`);
    }
  }
}
