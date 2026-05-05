import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateUserDto,
  MessagePatterns,
  UpdateUserDto,
} from '@nestjs/shared-lib';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(MessagePatterns.USER_CREATE)
  create(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @MessagePattern(MessagePatterns.USER_GET_ONE)
  findOne(@Payload() id: number) {
    return this.userService.findOne(id);
  }

  @MessagePattern(MessagePatterns.USER_GET_ALL)
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern(MessagePatterns.USER_GET_BY_EMAIL)
  findByEmail(email: string) {
    return this.userService.findByEmail(email);
  }

  /** Internal: returns user WITH password hash for auth-service credential validation */
  @MessagePattern(MessagePatterns.USER_VALIDATE_CREDENTIALS)
  findByEmailWithPassword(@Payload() email: string) {
    return this.userService.findByEmailWithPassword(email);
  }

  @MessagePattern(MessagePatterns.USER_UPDATE)
  update(@Payload() payload: { id: number; updateUserDto: UpdateUserDto }) {
    return this.userService.update(payload.id, payload.updateUserDto);
  }

  @MessagePattern(MessagePatterns.USER_DELETE)
  remove(@Payload() id: number) {
    return this.userService.remove(id);
  }
}
