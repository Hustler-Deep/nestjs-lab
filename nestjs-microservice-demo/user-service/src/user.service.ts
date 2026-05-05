import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, messages, UpdateUserDto } from '@nestjs/shared-lib';
import { RpcException } from '@nestjs/microservices';
import { isDatabaseError } from './utils/common.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.usersRepository.create(createUserDto);
      const savedUser = await this.usersRepository.save(user);

      return {
        message: messages.USER_REGISTERED,
        data: savedUser,
      };
    } catch (error: unknown) {
      if (isDatabaseError(error) && error.code === 'ER_DUP_ENTRY') {
        // Duplicate email error from MySQL
        throw new RpcException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: messages.EMAIL_ALREADY_EXISTS,
        });
      }
      // Unknown DB error
      throw new RpcException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: messages.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async findAll() {
    const users = await this.usersRepository.find();
    return {
      message: messages.USER_FETCHED,
      data: users,
    };
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: messages.USER_NOT_FOUND,
      });
    }
    return {
      message: messages.USER_FETCHED,
      data: user,
    };
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersRepository.findOneBy({ id });
      if (!user) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: messages.USER_NOT_FOUND,
        });
      }

      const updatedUser = this.usersRepository.merge(user, updateUserDto);
      const savedUser = await this.usersRepository.save(updatedUser);

      return {
        message: messages.USER_UPDATED,
        data: savedUser,
      };
    } catch (error: unknown) {
      if (isDatabaseError(error) && error.code === 'ER_DUP_ENTRY') {
        // Duplicate email error from MySQL
        throw new RpcException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: messages.EMAIL_ALREADY_EXISTS,
        });
      }
      // Unknown DB error
      throw new RpcException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: messages.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async remove(id: number) {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: messages.USER_NOT_FOUND,
      });
    }

    return { message: messages.USER_DELETED };
  }
}
