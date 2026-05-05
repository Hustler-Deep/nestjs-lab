import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto, UpdateUserDto } from '@nestjs/shared-lib';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'create_user' })
  create(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'get_user' })
  findOne(@Payload() id: number) {
    return this.userService.findOne(id);
  }

  @MessagePattern({ cmd: 'get_users' })
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern({ cmd: 'get_user_by_email' })
  findByEmail(email: string) {
    return this.userService.findByEmail(email);
  }

  @MessagePattern({ cmd: 'update_user' })
  update(@Payload() payload: { id: number; updateUserDto: UpdateUserDto }) {
    return this.userService.update(payload.id, payload.updateUserDto);
  }

  @MessagePattern({ cmd: 'delete_user' })
  remove(@Payload() id: number) {
    const temp = this.userService.remove(id);
    console.log('temp', temp);
    return temp;
  }
}
