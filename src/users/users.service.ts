import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Firestore } from '@google-cloud/firestore';
import { v4 } from 'uuid';

@Injectable()
export class UsersService {
  private collection = new Firestore().collection('users');

  async create(createUserDto: CreateUserDto) {
    try {
      const id = v4();
      await this.collection.doc(id).set({
        id: id,
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      return { status: 'success', message: 'User created successfully' };
    } catch (error) {
      console.error('Error creating user:', error);
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
