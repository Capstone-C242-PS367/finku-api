import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Firestore } from '@google-cloud/firestore';
import { v4 } from 'uuid';

@Injectable()
export class UsersService {
  private collection = new Firestore().collection('users');

  async create(createUserDto: CreateUserDto) {
    const isAvail = await this.collection
      .where('email', '==', createUserDto.email)
      .limit(1)
      .get();
    if (!isAvail.empty) {
      throw new BadRequestException('User with this email already exists');
    }

    const id = v4();
    await this.collection.doc(id).set({
      id: id,
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    return {
      status: 'success',
      message: 'User created successfully',
      data: { id: id, name: createUserDto.name, email: createUserDto.email },
    };
  }

  async findAll() {
    const snapshot = await this.collection.get();
    if (!snapshot) {
      throw new InternalServerErrorException();
    }

    const data = [];
    snapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        name: doc.data().name,
        email: doc.data().email,
        created_at: doc.data().created_at,
        updated_at: doc.data().updated_at,
      });
    });

    return {
      status: 'success',
      message: 'All user fetched successfully',
      data: data,
    };
  }

  async findOne(id: string) {
    const snapshot = await this.collection.doc(id).get();
    if (!snapshot.exists) {
      throw new NotFoundException(`User with ID #${id} not found`);
    }

    return {
      status: 'success',
      message: 'User fetched successfully',
      data: snapshot.data(),
    };
  }

  async findByEmail(email: string) {
    const snapshot = await this.collection
      .where('email', '==', email)
      .limit(1)
      .get();
    if (snapshot.empty) {
      throw new NotFoundException();
    }

    return {
      status: 'success',
      message: 'User fetched successfully',
      data: snapshot.docs[0].data(),
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userDoc = this.collection.doc(id);
    const docSnapshot = await userDoc.get();
    if (!docSnapshot.exists) {
      throw new NotFoundException(`User with ID #${id} not found`);
    }

    await userDoc.update({
      name: updateUserDto.name,
      email: updateUserDto.email,
      password: updateUserDto.password,
      updated_at: new Date().toISOString(),
    });

    return {
      status: 'success',
      message: `User with ID #${id} updated successfully`,
      data: updateUserDto,
    };
  }

  async remove(id: string) {
    const userDoc = this.collection.doc(id);
    const docSnapshot = await userDoc.get();

    if (!docSnapshot.exists) {
      throw new NotFoundException(`User with ID #${id} not found`);
    }

    await userDoc.delete();

    return {
      status: 'success',
      message: `User with ID #${id} removed successfully`,
    };
  }
}
